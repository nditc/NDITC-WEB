"use client";

import React, { useState } from "react";
import { regDataInit, regDataType } from "@/config/registerData";
import Field from "@/app/club/Components/Field";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
import PassingYear from "@/app/club/Components/PassingYear";

interface NonMemberRegistrationProps {
    onRegistration: (data: any) => void;
    loading: boolean;
}

const NonMemberRegistration: React.FC<NonMemberRegistrationProps> = ({
    onRegistration,
    loading,
}) => {
    const [regData, setRegData] = useState<regDataType>(regDataInit);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (name: string, data: string | number) => {
        setRegData(prev => ({ ...prev, [name]: data }));
    };

    const validateForm = (): [boolean, string] => {
        if (!regData.name || !regData.institution || !regData.mobile || !regData.email || !password || !confirmPassword) {
            return [false, "Please fill in all required fields"];
        }

        if (password !== confirmPassword) {
            return [false, "Passwords do not match"];
        }

        if (password.length < 8) {
            return [false, "Password must be at least 8 characters long"];
        }

        return [true, ""];
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const [isValid, errorMessage] = validateForm();
        if (!isValid) {
            toast.error(errorMessage);
            return;
        }

        const nonMemberData = {
            ...regData,
            isMember: false,
            password,
        };

        onRegistration(nonMemberData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <Field
                state={regData.name}
                setValue={handleInputChange}
                name="name"
                type="text"
                label="Enter your full name"
            />


            <PassingYear
                state={regData.class}
                setValue={handleInputChange}
                name="class"
                label="HSC Passing Year"
                type="number"
            />

            <Field
                state={regData.institution}
                setValue={handleInputChange}
                name="institution"
                type="text"
                label="Enter your institution name"
            />

            <Field
                state={regData.mobile}
                setValue={handleInputChange}
                name="mobile"
                type="tel"
                label="Enter your mobile number"
            />

            <Field
                state={regData.address}
                setValue={handleInputChange}
                name="address"
                type="text"
                label="Enter your current address"
            />

            <Field
                state={regData.email}
                setValue={handleInputChange}
                name="email"
                type="email"
                label="Enter your email address"
            />

            <Field
                state={regData.fbLink}
                setValue={handleInputChange}
                name="fbLink"
                type="text"
                notRequired
                label="Enter your Facebook profile link"
            />

            <Field
                state={password}
                setValue={(name, value) => setPassword(String(value))}
                name="password"
                type="password"
                label="Enter your password"
            />

            <Field
                state={confirmPassword}
                setValue={(name, value) => setConfirmPassword(String(value))}
                name="confirmPassword"
                type="password"
                label="Confirm your password"
            />

            <button
                disabled={loading}
                className="mb-4 mt-6 w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary disabled:opacity-70"
                type="submit"
            >
                {loading ? (
                    <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                ) : (
                    "Register"
                )}
            </button>
        </form>
    );
};

export default NonMemberRegistration;