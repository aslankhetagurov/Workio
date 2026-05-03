import { Ref, useEffect, useRef, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { IoIosArrowDown } from 'react-icons/io';

import DropDownList from '@/shared/UI/DropDownList/DropDownList';
import styles from './CustomSelect.module.scss';

export interface TSeletcOptionObject {
    label: string;
    value: string;
}

interface CustomSelectProps<
    TOption extends string | TSeletcOptionObject,
    TFormValues extends FieldValues,
> {
    name: Path<TFormValues>;
    control: Control<TFormValues>;
    options: readonly TOption[];
    placeholder?: string;
    ariaLabel?: string;
    customSelectClass?: string;
    customSelectWrapperClass?: string;
    label?: string;
    required?: boolean;
    customSelectRef?: Ref<HTMLButtonElement>;
}

const CustomSelect = <
    TOption extends string | TSeletcOptionObject,
    TFormValues extends FieldValues,
>({
    name,
    control,
    options,
    placeholder = 'Select',
    ariaLabel,
    customSelectClass,
    customSelectWrapperClass,
    label,
    required = false,
    customSelectRef,
}: CustomSelectProps<TOption, TFormValues>) => {
    const { field } = useController({
        name,
        control,
        rules: { required: required },
    });
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selected = options.find((opt) =>
        typeof opt === 'string'
            ? opt === field.value
            : opt.value === field.value,
    );

    const handleSetValue = (value: string) => {
        setIsOpen(false);
        field.onChange(value);
    };

    useEffect(() => {
        if (!isOpen) return;

        const clickOutside = (e: Event) => {
            if (!selectRef.current?.contains(e.target as Node))
                setIsOpen(false);
        };

        window.addEventListener('click', clickOutside);

        return () => {
            window.removeEventListener('click', clickOutside);
        };
    }, [isOpen]);

    return (
        <div
            className={`${styles.select} ${customSelectWrapperClass ?? ''}`}
            ref={selectRef}
        >
            <div className={styles['select__button-wrapper']}>
                {label && <span className={styles.select__label}>{label}</span>}

                <button
                    className={`${styles.select__button} ${
                        customSelectClass ?? ''
                    } ${selected ? styles.select__selected : ''}`}
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-label={ariaLabel}
                    aria-controls={`${name}-dropdown-id`}
                    ref={customSelectRef}
                >
                    <span>
                        {typeof selected === 'string'
                            ? selected
                            : selected?.label || placeholder}
                    </span>
                    <IoIosArrowDown className={styles.select__icon} />
                </button>
            </div>

            <DropDownList
                list={options}
                handleSetValue={handleSetValue}
                showDropDown={isOpen}
                id={`${name}-dropdown-id`}
                topMargin={label ? 69 : 42}
            />
        </div>
    );
};

export default CustomSelect;
