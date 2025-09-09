"use client";

import React, { useState } from "react";
import { regDataInit, regDataType } from "@/config/registerData";
import Field from "@/app/club/Components/Field";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
import { CiWarning } from "react-icons/ci";

interface MemberRegistrationProps {
    onRegistration: (data: any) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const MemberRegistration: React.FC<MemberRegistrationProps> = ({
    onRegistration,
    loading,
    setLoading,
}) => {
    const [regData, setRegData] = useState<regDataType>(regDataInit);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (name: string, data: string | number) => {
        setRegData(prev => ({ ...prev, [name]: data }));
    };

    const validateForm = (): [boolean, string] => {
        if (!regData.ndc_roll || !regData.email || !password || !confirmPassword) {
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

    const handleMemberVerification = async () => {
        const [isValid, errorMessage] = validateForm();
        if (!isValid) {
            toast.error(errorMessage);
            return false;
        }

        setLoading(true);
        try {
            // Verify member using the API route
            const response = await fetch("/api/createaccountndc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ndc_roll: regData.ndc_roll,
                    email: regData.email,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || "Member verification failed");
                return false;
            }

            const memberData = {
                ...regData,
                name: result.name,
                mobile: result.mobile,
                address: result.address, 
                ndc_roll: result.roll,
                institution: "Notre Dame College",
                ndc_id: result.ndc_id,
                isMember: true,
                password,
            };

            onRegistration(memberData);
            return true;

        } catch (error) {
            console.error("Member verification error:", error);
            toast.error("Failed to verify member. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await handleMemberVerification();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-xl bg-yellow-100 p-5 text-yellow-950">
                <p className="flex items-center gap-1 font-bold">
                    <CiWarning />
                    Notice:
                </p>
                <p>
                    All Batch '27 Students are requested to create a Non-member
                    Account right now as all of your Club Forms haven't been
                    submitted yet. After we announce, you can enter your Roll in
                    your profile and it will be converted to a Member account
                    automatically.
                </p>
            </div>

            <Field
                state={regData.ndc_roll}
                setValue={handleInputChange}
                name="ndc_roll"
                type="number"
                label="Enter your NDC roll number"
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
                    "Verify and Register"
                )}
            </button>
        </form>
    );
};

export default MemberRegistration;