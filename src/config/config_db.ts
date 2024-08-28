import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const getConfig = () => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const config = await getDoc(doc(db, 'config', 'config'));
      resolve(config.data());
    } catch (err) {
      reject(err);
    }
  });
};
const setConfig = (field: string, value: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      await updateDoc(doc(db, 'config', 'config'), { [field]: value });
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};
const setConfigAll = (config: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      await updateDoc(doc(db, 'config', 'config'), { ...config });
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};
const useConfig = (deps: any[]) => {
  const [config, setConfigState] = useState<any>();
  const [loading, setLoding] = useState<boolean>(false);
  useEffect(() => {
    setLoding(true);
    getConfig()
      .then((config: any) => {
        setConfigState(config);
        setLoding(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Aww Snap!');
        setLoding(false);
      });
  }, deps);
  return [config, setConfig, loading];
};
export { getConfig, setConfig, setConfigAll, useConfig };
