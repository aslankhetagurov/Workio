import { useEffect, useMemo, useRef, useState } from 'react';
import { FieldValues, PathValue } from 'react-hook-form';
import { IoIosPin } from 'react-icons/io';

import DropDownList from '../../UI/DropDownList/DropDownList';
import { useDebouncedWatch } from '@/shared/hooks/useDebouncedWatch';
import { ILocationItem, useGetLocationsQuery } from '@/store/api/locationApi';
import { useCloseViaClickOutsideAndEsc } from '@/shared/hooks/useCloseViaClickOutsideAndEsc';
import { IAutocompleteInputProps } from '@/shared/types/IAutocompleteInputProps.types';
import styles from './LocationInput.module.scss';

const LocationInput = <T extends FieldValues>({
    register,
    watch,
    setValue,
    name,
    label,
    customLabelClass,
    customInputClass,
    customIconClass,
    placeholder,
    icon = true,
    required = false,
}: IAutocompleteInputProps<T>) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    useCloseViaClickOutsideAndEsc(inputRef, isOpenDropDown, setIsOpenDropDown);

    const locationInput = watch(name);
    const debouncedLocation = useDebouncedWatch(locationInput, 300);

    const { ref: inputRegisterRef, ...inputProps } = register(name, {
        required: required,
    });

    const { data: locationList } = useGetLocationsQuery(debouncedLocation, {
        skip: !debouncedLocation,
    });

    const filteredLocationList = useMemo(
        () =>
            locationList?.map(
                (location: ILocationItem) => location.display_place
            ),
        [locationList]
    );

    useEffect(() => {
        const input = debouncedLocation?.trim().toLowerCase();

        if (!input || !filteredLocationList) {
            return;
        }

        if (input && !isOpenDropDown) {
            setIsOpenDropDown(true);
        }

        if (filteredLocationList[0].toLowerCase() === input) {
            setIsOpenDropDown(false);
        }
    }, [debouncedLocation]);

    const handleSetValue = (value: string) => {
        setValue(name, value as PathValue<T, typeof name>);
    };

    const handleFocus = () => {
        if (
            filteredLocationList &&
            !filteredLocationList[0].toLowerCase() ===
                debouncedLocation?.trim().toLowerCase()
        ) {
            setIsOpenDropDown(true);
        }
    };

    return (
        <label
            className={customLabelClass || styles['location-input__label']}
            htmlFor={name}
        >
            <span className={styles['location-input__label-title']}>
                {label}
            </span>
            <div className={styles['location-input__input-wrapper']}>
                {icon && (
                    <IoIosPin
                        className={
                            customIconClass || styles['location-input__icon']
                        }
                    />
                )}

                <input
                    className={
                        customInputClass || styles['location-input__input']
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
                    autoComplete={debouncedLocation ? 'off' : 'on'}
                    aria-expanded={isOpenDropDown}
                    aria-controls={`${name}-dropdown-id`}
                    aria-autocomplete="list"
                    role="combobox"
                />

                <DropDownList
                    list={filteredLocationList || []}
                    handleSetValue={handleSetValue}
                    showDropDown={isOpenDropDown}
                    id={`${name}-dropdown-id`}
                />
            </div>
        </label>
    );
};

export default LocationInput;
