import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment/moment';

export interface Props {
    value: string | null;
    name: string;
    handler: (data: { [key: string]: any }) => void;
    default_value: string | null;
}
interface TargetWithPicker {
    showPicker?: () => void;
}

// Format time
export function formattedTime(value: string | null): string {
    return value
        ? moment(value, 'HH:mm:ss').format('h:mm A')
        : moment().format('h:mm A');
}

const Time: React.FC<Props> = ({
    value,
    name,
    handler,
    default_value,
}: Props) => {
    const timeInput = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<string | null>(null);

    useEffect(() => {
        setInputValue(value);
        return () => setInputValue(null);
    }, [value]);

    function timeHandler() {
        if (timeInput.current) {
            const inputValue = timeInput.current.value;
            const formattedTime = moment(inputValue, 'HH:mm').format(
                'HH:mm:ss',
            ); // Ensures a proper time format
            setInputValue(formattedTime);

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
            className="text-capitalize d-block time-custom-control"
        >
            <input
                type="time"
                ref={timeInput}
                onClick={(e) => handleClick(e)}
                id={name}
                name={name}
                onChange={timeHandler}
                className="form-control"
            />
            <div className="form-control preview">
                {default_value && formattedTime(default_value)}
            </div>
        </label>
    );
};

export default Time;
