import { useState } from "react";
import "./ProfilePage.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setDate, setGender, setName } from "../store/userSlice";

const DEFAULT_SELECT = "Выберете элемент";
const mainOptions = ['Красный', 'Синий', 'Желтый'];
const extraOptions = ['Вариант 1', 'Вариант 2', 'Вариант 3'];
const AUTO_COLOR = '#aa3bff';
const AUTO_TEXT = 'Hello world';

const currentMonthValue = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

export default function ProfilePage() {
    const { name } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [isMainOpen, setIsMainOpen] = useState(false);
    const [mainSelected, setMainSelected] = useState(DEFAULT_SELECT);
    const [isExtraOpen, setIsExtraOpen] = useState(false);
    const [extraSelected, setExtraSelected] = useState(DEFAULT_SELECT);
    const [cardFieldValue, setCardFieldValue] = useState('');
    const [isExtraOn, setIsExtraOn] = useState(false);
    const [month, setMonth] = useState('');
    const [color, setColor] = useState('#000000');
    const [extraText, setExtraText] = useState('');

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const usernameValue = form.username.value;

        if(usernameValue.trim()) 
            dispatch(setName({name: usernameValue}));
        if (form.date.value)
            dispatch(setDate({date: form.date.value}));
        if (form.gender)
            dispatch(setGender({gender: form.gender.value}))

        form.reset();
        form.username.value = usernameValue;
        setCardFieldValue('');
        setMainSelected(DEFAULT_SELECT);
        setExtraSelected(DEFAULT_SELECT);
        setIsMainOpen(false);
        setIsExtraOpen(false);
        setIsExtraOn(false);
        setMonth('');
        setColor('#000000');
        setExtraText('');
    }

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') return;
        if (Number(value) < 0) e.target.value = '0';
    }

    const handleToggle = (e : React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsExtraOn(checked);
        if (checked) {
            setMonth(currentMonthValue());
            setColor(AUTO_COLOR);
            setExtraSelected(extraOptions[0]);
            setIsExtraOpen(false);
            setExtraText(AUTO_TEXT);
        }
    }

    const handleCardValueChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const inputDigitsOnly = e.target.value.replace(/\D/g, '');
        const limitedDigits = inputDigitsOnly.substring(0, 16);
        const formattedCard = limitedDigits.match(/.{1,4}/g)?.join(' ') || '';

        setCardFieldValue(formattedCard);
    }
  
    return (
      <div className="profile-page">
      <div className="profile-page__title">profile {name}</div>
      <form className="profile-page__form" onSubmit={handleSubmit}>
        <div className="profile-page__field">
            <label className="profile-page__label" htmlFor="username">Имя</label>
            <input className="profile-page__input" id="username" name="username" type="text" defaultValue={name}/>
        </div>
        <div className="profile-page__field">
            <label className="profile-page__label" htmlFor="date">Дата рождения</label>
            <input className="profile-page__input" id="date" name="date" type="date"/>
        </div>
        <fieldset className="profile-page__field profile-page__field--group">
            <legend className="profile-page__label">Пол</legend>
            <div className="profile-page__radiogroup" role="radiogroup">
                
                <input className="profile-page__radio" type="radio" id="gOpt1" name="gender" value="W"/>
                <label className="profile-page__radio-label" htmlFor="gOpt1">Женский</label>
                
                <input className="profile-page__radio" type="radio" id="gOpt2" name="gender" value="M"/>
                <label className="profile-page__radio-label" htmlFor="gOpt2">Мужской</label>
                
                <input className="profile-page__radio" type="radio" id="gOpt3" name="gender" value="null" defaultChecked/>
                <label className="profile-page__radio-label" htmlFor="gOpt3">Не указывать</label>
            </div>
        </fieldset>
        <div className="profile-page__field">
            <label className="profile-page__label" htmlFor="email">Email</label>
            <input className="profile-page__input" id="email" type="email" placeholder="name@example.com"/>
        </div>
        <div className="profile-page__field">
            <label className="profile-page__label" htmlFor="phone">Телефон</label>
            <input className="profile-page__input" id="phone" type="tel" placeholder="+7 (900) 000-00-00"/>
        </div>
        <div className="profile-page__field">
            <label className="profile-page__label" htmlFor="age">Возраст</label>
            <input className="profile-page__input" id="age" type="number" min={0} onChange={handleAgeChange} onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') e.preventDefault(); }}/>
        </div>
        <div className="profile-page__field">
            <label className="profile-page__label" htmlFor="time">Время</label>
            <input className="profile-page__input" id="time" type="time"/>
        </div>
        <div className="profile-page__field">
            <label className="profile-page__label" htmlFor="level">Уровень</label>
            <div className="profile-page__range">
                <span className="profile-page__range-bound">0</span>
                <input className="profile-page__input profile-page__input--range" id="level" type="range" min="0" max="10"/>
                <span className="profile-page__range-bound">10</span>
            </div>
        </div>
        <div className="profile-page__field">
            <span className="profile-page__label" id="dropdownLabel">Выбор</span>
            <div className="profile-page__dropdown">
                <button className="profile-page__select" type="button" aria-labelledby="dropdownLabel" onClick={() => setIsMainOpen((prev) => !prev)}>{mainSelected} {isMainOpen ? '▲' : '▼'}</button>
                {isMainOpen && (
                    <ul className="profile-page__menu">
                        {mainOptions.map((option) => (
                            <li className="profile-page__option" key={option} onClick={() => { setMainSelected(option); setIsMainOpen(false); }}>{option}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        <div className="profile-page__field">
            <label className="profile-page__label" htmlFor="comment">Комментарий</label>
            <textarea className="profile-page__input" id="comment" rows={3}/>
        </div>

        <div className="profile-page__field">
            <label className="profile-page__label" htmlFor="toggleInput">Дополнительно</label>
            <label className="profile-page__toggle">
                <input className="profile-page__toggle-input" type="checkbox" id="toggleInput" checked={isExtraOn} onChange={handleToggle}/>
                <span className="profile-page__toggle-slider"></span>
            </label>
        </div>

        {/* зависимый от toggle */}
        <div className="profile-page__extra"> 
            <div className="profile-page__field">
                <label className="profile-page__label" htmlFor="month">Месяц</label>
                <input className="profile-page__input" id="month" type="month" placeholder="2026-09" value={month} disabled={isExtraOn} onChange={(e) => setMonth(e.target.value)}/>
            </div>
            <div className="profile-page__field">
                <label className="profile-page__label" htmlFor="website">Сайт</label>
                <input className="profile-page__input" id="website" type="url" placeholder="https://example.com"/>
            </div>
            <div className="profile-page__field">
                <label className="profile-page__label" htmlFor="color">Цвет</label>
                <input className="profile-page__input" id="color" type="color" value={color} onChange={(e) => setColor(e.target.value)}/>
            </div>
            <div className="profile-page__field">
                <span className="profile-page__label" id="extraDropdownLabel">Дополнительный выбор</span>
                <div className="profile-page__dropdown">
                    <button className="profile-page__select" type="button" aria-labelledby="extraDropdownLabel" onClick={() => setIsExtraOpen((prev) => !prev)}>{extraSelected} {isExtraOpen ? '▲' : '▼'}</button>
                    {isExtraOpen && (
                        <ul className="profile-page__menu">
                            {extraOptions.map((option) => (
                                <li className="profile-page__option" key={option} onClick={() => { setExtraSelected(option); setIsExtraOpen(false); }}>{option}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="profile-page__field">
                <label className="profile-page__label" htmlFor="extraText">Текст</label>
                <input className="profile-page__input" id="extraText" type="text" value={extraText} disabled={isExtraOn} onChange={(e) => setExtraText(e.target.value)}/>
            </div>
            {!isExtraOn && (
                <>
                    <div className="profile-page__field">
                        <label className="profile-page__label" htmlFor="extraNumber">Число</label>
                        <input className="profile-page__input" id="extraNumber" type="number"/>
                    </div>
                    <div className="profile-page__field">
                        <label className="profile-page__label" htmlFor="file">Файл</label>
                        <input className="profile-page__input" id="file" type="file"/>
                    </div>
                </>
            )}
        </div>

        <div className="profile-page__field">
            <label className="profile-page__label" htmlFor="cardNumber">Номер карты</label>
            <input 
            className="profile-page__input profile-page__input--card"
            id="cardNumber"
            type="text"
            inputMode="numeric"
            placeholder="0000 0000 0000 0000"
            value={cardFieldValue}
            onChange={handleCardValueChange}
            />
        </div>
        <fieldset className="profile-page__field profile-page__field--group">
            <legend className="profile-page__label">Опции</legend>
            <div className="profile-page__checkboxes">
                <input className="profile-page__checkbox" type="checkbox" id="opt1" name="checkboxGroup" value="1"/>
                <label className="profile-page__label" htmlFor="opt1">Option 1</label>
                <input className="profile-page__checkbox" type="checkbox" id="opt2" name="checkboxGroup" value="2"/>
                <label className="profile-page__label" htmlFor="opt2">Option 2</label>
                <input className="profile-page__checkbox" type="checkbox" id="opt3" name="checkboxGroup" value="3"/>
                <label className="profile-page__label" htmlFor="opt3">Option 3</label>
                <input className="profile-page__checkbox" type="checkbox" id="opt4" name="checkboxGroup" value="4"/>
                <label className="profile-page__label" htmlFor="opt4">Option 4</label>
            </div>
        </fieldset>
        <button className="profile-page__submit" type="submit">Save</button>
      </form>
       </div>
    )
  }
