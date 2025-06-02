import PrimaryButton from '../PrimaryButton/PrimaryButton';
import styles from './DropDownList.module.scss';

interface DropDownListProps {
    list: string[];
    handleSetValue: (value: string) => void;
    showDropDown: boolean;
    id: string;
}

const DropDownList = ({
    list,
    handleSetValue,
    showDropDown,
    id,
}: DropDownListProps) => {
    return (
        <ul
            className={`${styles['dropdown-list']} ${
                showDropDown && list.length ? styles['dropdown-list-show'] : ''
            }`}
            role="listbox"
            id={id}
        >
            {list?.slice(0, 5).map((item, i) => {
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
