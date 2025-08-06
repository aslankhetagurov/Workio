import { TSeletcOptionObject } from '@/shared/components/CustomSelect/CustomSelect';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import styles from './DropDownList.module.scss';

interface DropDownListProps {
    list: readonly (string | TSeletcOptionObject)[];
    handleSetValue: (value: string) => void;
    showDropDown: boolean;
    id?: string;
    itemsLimit?: number;
    topMargin?: number;
}

const DropDownList = ({
    list,
    handleSetValue,
    showDropDown,
    id,
    itemsLimit,
    topMargin,
}: DropDownListProps) => {
    return (
        <ul
            className={`${styles['dropdown-list']} ${
                showDropDown && list.length ? styles['dropdown-list-show'] : ''
            }`}
            role="listbox"
            id={id}
            style={{ top: `${topMargin}px` }}
        >
            {list.slice(0, itemsLimit).map((item, i) => {
                const key = typeof item === 'string' ? item : item.value;
                const label = typeof item === 'string' ? item : item.label;
                const value = typeof item === 'string' ? item : item.value;

                return (
                    <li
                        className={styles['dropdown-list__item']}
                        key={`${key}-${i}`}
                        role="option"
                    >
                        <PrimaryButton
                            label={label}
                            ariaLabel={label}
                            onClick={() => handleSetValue(value)}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default DropDownList;
