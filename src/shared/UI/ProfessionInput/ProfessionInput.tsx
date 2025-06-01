import { useEffect, useRef, useState } from 'react';
import {
    FieldValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
    Path,
    PathValue,
} from 'react-hook-form';
import { IoIosSearch } from 'react-icons/io';

import { useDebouncedWatch } from '@/shared/hooks/useDebouncedWatch';
import { professions, TProfessionsType } from '@/shared/consts/professions';
import DropDownList from '../DropDownList/DropDownList';
import styles from './ProfessionInput.module.scss';

interface ProfessionInputProps<T extends FieldValues> {
    register: UseFormRegister<T>;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
    name: Path<T>;
    placeholder: string;
    label?: string;
    customLabelClass?: string;
    customInputClass?: string;
    customIconClass?: string;
}

const ProfessionInput = <T extends FieldValues>({
    register,
    watch,
    setValue,
    name,
    label,
    customLabelClass,
    customInputClass,
    customIconClass,
    placeholder,
}: ProfessionInputProps<T>) => {
    const [filteredProfessions, setFilteredProfessions] = useState<
        TProfessionsType[] | null
    >(null);
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const professionInput = watch(name);
    const debouncedProfessionInput = useDebouncedWatch(professionInput, 500);

    const { ref: inputRegisterRef, ...inputProps } = register(name);

    useEffect(() => {
        const input = debouncedProfessionInput?.trim().toLowerCase();

        if (!input) {
            setFilteredProfessions(null);
            return;
        }

        if (input && !isOpenDropDown) {
            setIsOpenDropDown(true);
        }

        const filteredProfessions = professions.filter((job) =>
            job.toLowerCase().includes(input)
        );

        if (
            filteredProfessions.length === 1 &&
            filteredProfessions[0].toLowerCase() === input
        ) {
            setFilteredProfessions(null);
        } else {
            setFilteredProfessions(
                filteredProfessions.length > 0 ? filteredProfessions : null
            );
        }
    }, [debouncedProfessionInput]);

    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                setIsOpenDropDown(false);
            }
        };
        const handleCloseDropDownViaEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpenDropDown(false);
            }
        };

        if (isOpenDropDown) {
            window.addEventListener('pointerdown', handleClickOutside);
            window.addEventListener('keydown', handleCloseDropDownViaEsc);
        }

        return () => {
            window.removeEventListener('pointerdown', handleClickOutside);
            window.removeEventListener('keydown', handleCloseDropDownViaEsc);
        };
    }, [isOpenDropDown]);

    const handleSetValue = (value: string) => {
        setValue(name, value as PathValue<T, typeof name>);
    };

    const handleFocus = () => setIsOpenDropDown(true);

    return (
        <label
            className={customLabelClass || styles['profession-input__label']}
            htmlFor={name}
        >
            <span className={styles['profession-input__label-title']}>
                {label}
            </span>
            <div className={styles['profession-input__input-wrapper']}>
                <IoIosSearch
                    className={
                        customIconClass || styles['profession-input__icon']
                    }
                />
                <input
                    className={
                        customInputClass || styles['profession-input__input']
                    }
                    type="text"
                    placeholder={placeholder || ''}
                    onFocus={handleFocus}
                    {...inputProps}
                    ref={(node) => {
                        inputRegisterRef(node);
                        inputRef.current = node;
                    }}
                    id={name}
                    autoComplete={debouncedProfessionInput ? 'off' : 'on'}
                    aria-expanded={isOpenDropDown}
                    aria-controls={`${name}-dropdown-id`}
                    aria-autocomplete="list"
                    role="combobox"
                />
            </div>

            <DropDownList
                list={filteredProfessions || []}
                handleSetValue={handleSetValue}
                showDropDown={isOpenDropDown}
                id={`${name}-dropdown-id`}
            />
        </label>
    );
};

export default ProfessionInput;
