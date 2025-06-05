import {
    FieldValues,
    UseFormRegister,
    UseFormWatch,
    UseFormSetValue,
    Path,
} from 'react-hook-form';

export interface IAutocompleteInputProps<T extends FieldValues> {
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
