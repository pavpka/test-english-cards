import { useState } from "react";
import "./ProfilePage.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setDate, setGender, setName } from "../store/userSlice";

export default function ProfilePage() {
    const { name } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Выберете элемент");
    const options = ['Элемент 1', 'Элемент 2', 'Элемент 3'];
    const [cardFieldValue, setCardFieldValue] = useState('');

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
        setSelectedValue("Выберете элемент");
        setIsOpen(false);
    }

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') return;
        if (Number(value) < 0) e.target.value = '0';
    }

    const handleSelect = (value: string) => {
        setIsOpen(false);
        setSelectedValue(value)
    }

    const handleToggle = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
        console.log('toggle on');
        } else console.log('toggle off');
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
                <label className="profile-page__radio-label" htmlFor="gOpt1">a</label>
                <input className="profile-page__radio" type="radio" id="gOpt1" name="gender" value="W"/>
                <label className="profile-page__radio-label" htmlFor="gOpt2">b</label>
                <input className="profile-page__radio" type="radio" id="gOpt2" name="gender" value="M"/>
                <label className="profile-page__radio-label" htmlFor="gOpt3">-</label>
                <input className="profile-page__radio" type="radio" id="gOpt3" name="gender" value="null" defaultChecked/>
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
            <input className="profile-page__input" id="level" type="range" min="0" max="10"/>
        </div>
        <div className="profile-page__field">
            <span className="profile-page__label" id="dropdownLabel">Выбор</span>
            <div className="profile-page__dropdown">
                <button className="profile-page__select" type="button" aria-labelledby="dropdownLabel" onClick={() => setIsOpen((prev) => !prev)}>{selectedValue} {isOpen ? '▲' : '▼'}</button>
                {isOpen && (
                    <ul className="profile-page__menu">
                        {options.map((option) => (
                            <li className="profile-page__option" key={option} onClick={() => handleSelect(option)}>{option}</li>
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
                <input className="profile-page__toggle-input" type="checkbox" id="toggleInput" onChange={handleToggle}/>
                <span className="profile-page__toggle-slider"></span>
            </label>
        </div>

        {/* зависимый от toggle */}
        <div className="profile-page__extra"> 
            <div className="profile-page__field">
                <label className="profile-page__label" htmlFor="month">Месяц</label>
                <input className="profile-page__input" id="month" type="month" placeholder="2026-09"/>
            </div>
            <div className="profile-page__field">
                <label className="profile-page__label" htmlFor="website">Сайт</label>
                <input className="profile-page__input" id="website" type="url" placeholder="https://example.com"/>
            </div>
            <div className="profile-page__field">
                <label className="profile-page__label" htmlFor="color">Цвет</label>
                <input className="profile-page__input" id="color" type="color"/>
            </div>
            <div className="profile-page__field">
                <span className="profile-page__label" id="extraDropdownLabel">Дополнительный выбор</span>
                <div className="profile-page__dropdown">
                    <button className="profile-page__select" type="button" aria-labelledby="extraDropdownLabel" onClick={() => setIsOpen((prev) => !prev)}>{selectedValue} {isOpen ? '▲' : '▼'}</button>
                    {isOpen && (
                        <ul className="profile-page__menu">
                            {options.map((option) => (
                                <li className="profile-page__option" key={option} onClick={() => handleSelect(option)}>{option}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="profile-page__field">
                <label className="profile-page__label" htmlFor="extraText">Текст</label>
                <input className="profile-page__input" id="extraText" type="text"/>
            </div>
            <div className="profile-page__field">
                <label className="profile-page__label" htmlFor="extraNumber">Число</label>
                <input className="profile-page__input" id="extraNumber" type="number"/>
            </div>
            <div className="profile-page__field">
                <label className="profile-page__label" htmlFor="file">Файл</label>
                <input className="profile-page__input" id="file" type="file"/>
            </div>
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
