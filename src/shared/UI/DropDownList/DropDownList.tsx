import PrimaryButton from '../PrimaryButton/PrimaryButton';
import styles from './DropDownList.module.scss';

interface DropDownListProps<T> {
    list: readonly T[];
    handleSetValue: (value: T) => void;
    showDropDown: boolean;
    id?: string;
    itemsLimit?: number;
    topMargin?: number;
}

const DropDownList = <T extends string>({
    list,
    handleSetValue,
    showDropDown,
    id,
    itemsLimit,
    topMargin,
}: DropDownListProps<T>) => {
    return (
        <ul
            className={`${styles['dropdown-list']} ${
                showDropDown && list.length ? styles['dropdown-list-show'] : ''
            }`}
            role="listbox"
            id={id}
            style={{ top: `${topMargin}px` }}
        >
            {list?.slice(0, itemsLimit).map((item, i) => {
                return (
                    <li
                        className={styles['dropdown-list__item']}
                        key={`${item}-${i}`}
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
