import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [countryCode, setCountryCode] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (countryCode.length === 2) {
            const covidFunc = async () => {
                const response = await fetch(
                    `https://disease.sh/v3/covid-19/countries/${countryCode}`
                );

                const result = await response.json();
                if (result && result.country) {
                    setData(result);
                    setError(null);
                } else {
                    setError("NO Country");
                    setData(null);
                }
            };
            covidFunc();
        } else {
            setData(null);
            setError(null);
        }
    }, [countryCode]);

    const handleChangeInput = (e) => {
        setCountryCode(e.target.value);
    };

    return (
        <div className="App">
            <h1>COVID-19 Death Tracker</h1>
            <input
                type="text"
                placeholder="Text"
                value={countryCode}
                onChange={handleChangeInput}
            />
            {error && <p className="error">{error}</p>}
            {data && (
                <p>
                    Total deaths in {data.country}
                    <strong>{data.deaths}</strong>
                </p>
            )}
        </div>
    );
}

export default App;
