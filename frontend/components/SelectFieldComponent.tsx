"use client"; // Ensure this is at the top of the file

import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function SelectFieldComponent({ options, placeholder, isMulti }: any) {
    return (
        <Select 
            isMulti={isMulti}
            options={options}
            placeholder={placeholder}
            classNames={{
                placeholder: () => `!text-sm !text-placeholder`,
                menu: () => `!rounded-lg !shadow-lg !shadow-gray-100 !border !border-primary/50`,
                menuList: () => `!capitalize !text-sm !p-2`,
                multiValue: () => `!px-0.5 !capitalize !rounded-md !bg-primary/10`,
                option: ({isSelected, isFocused}) => `${isSelected ? '!bg-primary' : ''} ${isFocused ? '!bg-primary/10 !text-primary' : ''}`,
                multiValueRemove: () => `!bg-transparent`,
                input: () => `!h-[34.5px]`,
                indicatorSeparator: () => `!hidden`,
                control: ({isFocused}) => `${isFocused ? '!shadow-none !border-primary !bg-white' : '!border-gray-100 !bg-gray-100'} !rounded-lg !cursor-pointer`
            }}
        />
    )
}