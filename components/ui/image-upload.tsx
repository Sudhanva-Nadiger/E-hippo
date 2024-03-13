"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary"

import { Button } from "./button";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    values: string[];
}

export default function ImageUpload({
    disabled,
    onChange,
    onRemove,
    values
}: ImageUploadProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if (!mounted) return null;

    console.log(values);
    

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {
                    values.map((url) => (
                        <div
                            key={url}
                            className="relative shadow-2xl w-[200px] h-[200px] rounded-md overflow-hidden"
                        >
                            <div className="z-10 absolute top-2 right-1">
                                <Button className="h-8 w-8" size={"icon"} variant={"destructive"} onClick={() => onRemove(url)}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <Image
                                src={url}
                                fill
                                className="object-cover"
                                alt="Image"
                            />
                        </div>
                    ))
                }
            </div>

            <CldUploadWidget
                onUpload={onUpload}
                uploadPreset="ndvcngmb"
            >
                {({ open }) => {
                    const onClick = () => {
                        if (disabled) return;
                        open();
                    }

                    return (
                        <Button
                            type="button"
                            className="button" 
                            onClick={onClick}
                            disabled={disabled}
                            variant={"secondary"}
                        >
                            <ImagePlus className="w-4 h-4 mr-2" />
                            Upload
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}