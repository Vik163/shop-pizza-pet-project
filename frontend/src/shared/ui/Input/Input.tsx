import React, {
   type InputHTMLAttributes,
   type SyntheticEvent,
   memo,
   useEffect,
   useRef,
   useState,
   Dispatch,
   SetStateAction,
} from 'react';
import { type Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Input.module.scss';
import { HStack, VStack } from '../Stack';
import { Text, FontColor } from '../Text';
import { FlexAlign, FlexJustify } from '../Stack/Flex';
import { Button } from '../Button';
import checkmark from '@/shared/assets/icons/Checkmark.svg';
import { Icon } from '../Icon';
import { usePhoneValidator } from '@/shared/lib/hooks/usePhoneValidator/usePhoneValidator';

type InputTypeProps = Omit<
   InputHTMLAttributes<HTMLInputElement>,
   'value' | 'onChange' | 'readOnly' | 'size'
>;

export enum InputVariant {
   INPUT_OUTLINE = 'outline',
   INPUT_CLEAR = 'clear',
   INPUT_CHECKBOX = 'checkbox',
   INPUT_RADIO = 'radio',
}

const inputVariantClasses: Record<InputVariant, string> = {
   outline: cls.inputOutline,
   clear: cls.inputClear,
   checkbox: cls.checkbox,
   radio: cls.radio,
};

interface InputProps extends InputTypeProps {
   className?: string;
   // размеры -----------------------
   widthInput: number;
   heightInput: number;
   widthInputAndEditButtonRight?: number;
   // вариант исполнения -------------
   withoutButtons?: boolean;
   labelLeft?: string;
   labelTop?: string;
   labelRight?: string;
   variant?: InputVariant; // стиль инпута
   // редактирование значения инпута ---------
   isEdit?: string;
   setIsEdit?: Dispatch<SetStateAction<string>>;
   saveValue?: (name: string, value: string) => void;
   // ------------------------------------------
   readonly?: boolean;
   error?: string;
   name: string;
   focusInput?: boolean; // управляет фокусом
   disabled?: boolean;
   fixedChangeValue?: number; // ограничивает количество вводимых символов
   value?: string;
   onChange?: (value: string) => void;
   // чекбокс -------------------
   checked?: boolean;
   onClickCheckbox?: () => void;
}

export const Input = memo((props: InputProps) => {
   const {
      className,
      labelLeft,
      labelTop,
      labelRight,
      readonly,
      variant = InputVariant.INPUT_OUTLINE,
      value,
      name,
      error,
      isEdit,
      setIsEdit,
      fixedChangeValue,
      disabled,
      focusInput,
      onClickCheckbox,
      pattern,
      type = 'text',
      placeholder,
      onChange,
      saveValue,
      checked,
      widthInput,
      withoutButtons,
      widthInputAndEditButtonRight,
      heightInput,
      ...otherProps
   } = props;

   // название кнопок редактирования
   const [editButtonInput, setEditButtonInput] = useState('');
   const [editButtonRight, setEditButtonRight] = useState(
      widthInputAndEditButtonRight && '',
   );
   const [isFocused, setIsFocused] = useState<boolean>(focusInput || false);
   const [isDisable, setIsDisable] = useState<boolean>(disabled || false);
   // console.log('isDisable:', isDisable);
   const [isValue, setIsValue] = useState('');
   const code = name === 'confirmCode';
   const checkboxButtonsType = type === 'checkbox' || type === 'radio';
   const isCheckbox = type === 'checkbox';
   const ref = useRef<HTMLInputElement>(null);

   // хук, возвращающий измененный номер телефона (9999999999 -> +7 (999) 999-99-99)
   const { phoneValidator } = usePhoneValidator();
   // console.log('isEdit:', isEdit);

   // ------------------------------------------
   useEffect(() => {
      if (!(isEdit === name)) {
         setEditButtonInput('Изменить');
         setEditButtonRight('');
         if (disabled) {
            setIsFocused(false);
            setIsDisable(true);
         }
      } else {
         setEditButtonInput('Сохранить');
         setEditButtonRight('Отменить');
         setIsFocused(true);
         setIsDisable(false);
      }
   }, [name, isEdit, disabled]);
   // ----------------------------------------
   // useEffect(() => {
   //    if (!disabled) setIsDisable(false);
   // }, [disabled]);

   // TODO:  определиться с focusInput ====================
   useEffect(() => {
      setIsFocused(false);
   }, [focusInput]);
   // ------------------------------------------------------
   useEffect(() => {
      if (isFocused) {
         ref.current?.focus();
      } else {
         ref.current?.blur();
      }
   }, [isFocused]);

   // ===========================================================
   const onBlur = () => {
      setIsFocused(false);
   };

   // Установка value при фокусе ==================================
   const onFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      if (placeholder) {
         setIsValue(String(value) || placeholder);
      } else {
         setIsValue(String(value));
      }

      setIsFocused(true);
   };

   // ====================================================================
   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      // ограниченная длина значения инпута
      if (fixedChangeValue) {
         if (fixedChangeValue && fixedChangeValue > e.target.value.length - 1) {
            if (type === 'tel' && e.target.value) {
               setIsValue(() => phoneValidator(e.target.value));
            } else {
               setIsValue(e.target.value);
            }
         }
      } else if (type === 'tel' && e.target.value) {
         setIsValue(() => phoneValidator(e.target.value));
      } else {
         setIsValue(e.target.value);
      }
      onChange?.(e.target.value);
   };

   // Кнопка редактирования в инпуте ============================================
   const clickEditButtonInput = (e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (setIsEdit) setIsEdit(name);
      if (editButtonInput === 'Сохранить') saveValue?.(name, isValue);
   };

   // Кнопка редактирования справа инпута =======================================
   const clickButtonRight = (e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (setIsEdit) setIsEdit('');
      setIsValue('');
      if (editButtonRight === 'Сохранить') saveValue?.(name, isValue);
   };

   // -----------------------------------------------------------------
   const classes = [inputVariantClasses[variant]];

   const editButtonRightColor =
      editButtonRight === 'Отменить' || editButtonRight === 'Получить новый код'
         ? FontColor.TEXT_YELLOW
         : FontColor.TEXT_INPUT_EDIT;

   const mods: Mods = {
      [cls.readonly]: readonly,
      [cls.witheditButtonRight]: Boolean(editButtonRight),
      [cls.checkbox]: isCheckbox,
      [cls.radio]: type === 'radio',
      [cls.checkedRadio]: checked,
      [cls.checkedCheckbox]: checked,
   };

   const modsInput: Mods = {
      [cls.inActive]: isDisable && !code,
      [cls.active]: error,
      [cls.focused]: isFocused,
      [cls.editActive]: isEdit === name,
      [cls.switch]: checkboxButtonsType,
   };

   const input = (
      <HStack
         style={{
            width:
               checkboxButtonsType || withoutButtons
                  ? widthInput
                  : widthInputAndEditButtonRight,
            height: heightInput,
         }}
         className={classNames(cls.InputWrapper, mods, [])}
         justify={FlexJustify.BETWEEN}
      >
         {isCheckbox && checked && (
            <Icon
               Svg={checkmark}
               className={classNames(
                  cls.switchIcon,
                  { [cls.checkedIcon]: checked },
                  [],
               )}
            />
         )}
         <div className={cls.inputWithButton}>
            <input
               ref={ref}
               style={{ width: widthInput }}
               className={classNames(cls.input, modsInput, classes)}
               value={isValue || ''}
               type={type}
               pattern={pattern}
               name={name}
               // checked={checked} падает ошибка неконтролируемый инпут (checked реализую по-другому)
               placeholder={placeholder}
               onChange={onChangeHandler}
               onBlur={onBlur}
               onFocus={onFocus}
               disabled={isDisable}
               {...otherProps}
            />
            {!withoutButtons && !checkboxButtonsType && !code && (
               <Button
                  style={{ right: `${20}px` }}
                  className={classNames(cls.inputEdit, modsInput, [])}
                  onClick={clickEditButtonInput}
               >
                  {editButtonInput}
               </Button>
            )}
         </div>
         {!withoutButtons && editButtonRight && !checkboxButtonsType && (
            <Button
               fontColor={editButtonRightColor}
               className={classNames(cls.buttonRight, {}, [])}
               onClick={clickButtonRight}
            >
               {editButtonRight}
            </Button>
         )}
      </HStack>
   );

   if (labelLeft) {
      return (
         <HStack
            className={classNames('', {}, [className])}
            justify={FlexJustify.BETWEEN}
         >
            <Text className={cls.text}>{labelLeft}</Text>
            {input}
         </HStack>
      );
   }

   if (labelRight) {
      return (
         <HStack
            className={classNames(
               '',
               { [cls.switchCursor]: checkboxButtonsType },
               [className],
            )}
            justify={FlexJustify.START}
            onClick={onClickCheckbox}
         >
            {input}
            <Text className={cls.text}>{labelRight}</Text>
         </HStack>
      );
   }

   if (labelTop) {
      return (
         <VStack
            className={classNames('', {}, [className])}
            align={FlexAlign.START}
            justify={FlexJustify.BETWEEN}
         >
            <Text className={cls.text}>{labelTop}</Text>
            {input}
         </VStack>
      );
   }

   return input;
});
