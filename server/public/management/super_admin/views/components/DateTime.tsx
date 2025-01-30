import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment/moment';

export interface Props {
    value: string | null;
    name: string;
    handler: (data: { [key: string]: any }) => void;
}
interface TargetWithPicker {
    showPicker?: () => void;
}

// Format date and time
export function formattedDateTime(value: string | null): string {
    if (value) {
        return moment(value).format('Do MMM YY, h:mm A'); 
    } else {
        return moment().format('Do MMM YY, h:mm A');
    }
}


const DateTime: React.FC<Props> = ({ value, name, handler }: Props) => {
    const dateTimeInput = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<string | null>(null);

    useEffect(() => {
        setInputValue(value);

        return () => {
            setInputValue(null);
        };
    }, [value]);

    function dateTimeHandler() {
        if (dateTimeInput.current) {
            const inputValue = dateTimeInput.current.value;
            const formattedTime = moment(inputValue).format('YYYY-MM-DD HH:mm:ss'); // Removes "T" and "Z"
            
            handler({
                [name]: formattedTime,
                key: name,
                value: formattedTime,
            });
        }
    }
        
    

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as TargetWithPicker | null;
        if (target?.showPicker) {
            target.showPicker();
        }
    };

    return (
        <label
            htmlFor={name}
            className="text-capitalize d-block date-time-custom-control"
        >
            <input
                type="datetime-local"
                ref={dateTimeInput}
                onClick={(e) => handleClick(e)}
                id={name}
                name={name}
                onChange={dateTimeHandler}
                className="form-control"
            />
            <div className="form-control preview">
                {inputValue && formattedDateTime(inputValue)}
            </div>
        </label>
    );
};

export default DateTime;
