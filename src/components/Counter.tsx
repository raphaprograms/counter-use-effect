import React, { useState, useEffect} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';



function Counter() {
    const [count, setCount] = useState<number>(0);
    const [countHistory, setCountHistory] = useState<number[]>([]);
    const [stepValue, setStepValue] = useState<number>(1);
    const [storedValue, setStoredValue] = useLocalStorage('current count:', count);

    // setCount((prevCount) => prevCount + 1 );
    //     console.log(count);

    //localStorage here? 
    // useEffect(() => {

    // }, []);

    useEffect(() => {
        setCountHistory((prevCountHistory) => [...prevCountHistory, count]);
        setStoredValue(count);
        console.log(countHistory);
    }, [count]);


    function handleReset() {
        setCount(0);
        setCountHistory([]);
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(`Key pressed: ${event.key}`);
            if (event.key === 'ArrowUp') {
                setCount((prevCount) => prevCount + stepValue);
            } else if (event.key === 'ArrowDown') {
                setCount((prevCount) => prevCount - stepValue);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            //clean up
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [stepValue]);

    const handleStepValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedValue = parseInt(event.target.value) // not necessary now that I changed the input type to a number but keeping here as a note
        setStepValue(isNaN(updatedValue) ? 1 : updatedValue);
    }

    return (
        <> 
            <h1>Counter</h1>
            <h2>Current Count: {count}</h2>
            <div>
                <button onClick={() => setCount(count - stepValue)}>Decrement</button>
                <button onClick={() => setCount(count + stepValue)}>Increment</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <h3>Step Value:
                <input type="number" value={stepValue} onChange={handleStepValue}/> 
            </h3>
            <p>Count History: </p>
            <hr />
            <p>{countHistory}</p>

        </>
    );
}

export default Counter;
