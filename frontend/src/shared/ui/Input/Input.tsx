import React, {
   type InputHTMLAttributes,
   type SyntheticEvent,
   memo,
   useEffect,
   useRef,
   useState,
} from 'react';
import { SerializedError } from '@reduxjs/toolkit';
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
}

const inputVariantClasses: Record<InputVariant, string> = {
   outline: cls.inputOutline,
   clear: cls.inputClear,
};

interface InputProps extends InputTypeProps {
   className?: string;
   widthInput: number;
   heightInput: number;
   withoutButtons?: boolean;
   widthInputAndEditButtonRight?: number;
   labelLeft?: string;
   labelTop?: string;
   labelRight?: string;
   value: string;
   codePhone?: string;
   onChange?: (value: string) => void;
   onClick?: () => void;
   readonly?: boolean;
   buttonRight?: string;
   error?: SerializedError | null;
   name: string;
   variant?: InputVariant;
   checked?: boolean;
   focusInput?: boolean;
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
      disabled,
      focusInput,
      buttonRight,
      pattern,
      type = 'text',
      placeholder,
      onChange,
      checked,
      widthInput,
      withoutButtons,
      widthInputAndEditButtonRight,
      heightInput,
      ...otherProps
   } = props;
   const [isFocused, setIsFocused] = useState(focusInput || false);
   const [editButtonInput, setEditButtonInput] = useState('');
   const [editButtonRight, setEditButtonRight] = useState(
      widthInputAndEditButtonRight && (buttonRight || ''),
   );
   const [isDisable, setIsDisable] = useState(disabled || false);
   const [isValue, setIsValue] = useState('');
   const { normalizeInput } = usePhoneValidator();
   // console.log(isValue);
   // const [isChecked, setIsChecked] = useState(true);
   const ref = useRef<HTMLInputElement>(null);
   const switchButton = type === 'checkbox' || type === 'radio';
   const code = name === 'code';
   const isCheckbox = type === 'checkbox';

   useEffect(() => {
      if (name === 'phone') {
         setEditButtonInput('');
      } else if (placeholder) {
         setEditButtonInput('Изменить');
      } else {
         setEditButtonInput('Сохранить');
      }
   }, [name, placeholder]);

   useEffect(() => {
      if (disabled) {
         setIsDisable(true);
      } else {
         setIsDisable(false);
      }

      if (value === placeholder) setIsDisable(true);
   }, [disabled, placeholder, value]);

   useEffect(() => {
      setIsFocused(false);
   }, [focusInput]);

   useEffect(() => {
      if (isFocused) {
         ref.current?.focus();
      } else {
         ref.current?.blur();
      }
   }, [isFocused]);

   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const valueInput =
         type === 'tel' && e.target.value
            ? () => normalizeInput(e.target.value)
            : e.target.value;
      setIsValue(valueInput);

      onChange?.(e.target.value);
   };

   const clickSwitch = () => {
      if (!switchButton) return;
      console.log('i');
   };

   const onBlur = () => {
      setIsFocused(false);
   };

   const onFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      if (placeholder) {
         setIsValue(String(value) || placeholder);
      } else {
         setIsValue(String(value));
      }

      setIsFocused(true);
   };

   const clickEditButtonInput = (e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log('o');

      setEditButtonInput('Сохранить');
      setEditButtonRight('Отменить');
      setIsFocused(true);
      setIsDisable(false);
      if (placeholder) setIsValue(placeholder);
   };

   const clickButtonRight = (e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();

      setEditButtonRight('');
      setEditButtonInput('Изменить');
      setIsFocused(false);
      setIsDisable(true);
      setIsValue('');
   };

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
      // [cls.withValue]: value,
      [cls.inActive]: isDisable && !code,
      [cls.active]: error?.message,
      [cls.focused]: isFocused,
      [cls.editActive]:
         editButtonInput === 'Изменить' ||
         (Boolean(isValue) && String(isValue) !== String(placeholder)),
      [cls.switch]: switchButton,
   };

   const input = (
      <HStack
         style={{
            width:
               switchButton || withoutButtons
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
               value={isValue}
               type={type}
               pattern={pattern}
               name={name}
               checked={checked}
               placeholder={placeholder}
               onChange={onChangeHandler}
               onBlur={onBlur}
               onFocus={onFocus}
               disabled={isDisable}
               {...otherProps}
            />
            {!withoutButtons && !switchButton && !code && (
               <Button
                  style={{ right: `${20}px` }}
                  className={classNames(cls.inputEdit, modsInput, [])}
                  onClick={clickEditButtonInput}
               >
                  {editButtonInput}
               </Button>
            )}
         </div>
         {!withoutButtons && editButtonRight && !switchButton && (
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
            className={classNames('', { [cls.switchCursor]: switchButton }, [
               className,
            ])}
            justify={FlexJustify.START}
            onClick={clickSwitch}
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
