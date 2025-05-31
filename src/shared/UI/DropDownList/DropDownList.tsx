import { TProfessionsType } from '@/shared/consts/professions';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import styles from './DropDownList.module.scss';

interface DropDownListProps {
    list: TProfessionsType[];
    handleSetValue: (value: string) => void;
    showDropDown: boolean;
}

const DropDownList = ({
    list,
    handleSetValue,
    showDropDown,
}: DropDownListProps) => {
    return (
        <ul
            className={`${styles['dropdown-list']} ${
                showDropDown && list.length ? styles['dropdown-list-show'] : ''
            }`}
            role="listbox"
        >
            {list?.slice(0, 5).map((item) => {
                return (
                    <li
                        className={styles['dropdown-list__item']}
                        key={item}
                        role="option"
                    >
                        <PrimaryButton
                            label={item}
                            ariaLabel={item}
                            onClick={() => handleSetValue(item)}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default DropDownList;
