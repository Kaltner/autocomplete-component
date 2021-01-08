import { FC, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
interface City {
  name: string;
}

const AutoComplete: FC = () => {
  const [cities, setCities] = useState([]);

  const mockCities: City[] = [
    { name: "Vancouver" },
    { name: "New Westminster" },
    { name: "Burnaby" },
    { name: "Richmond" },
    { name: "Delta" },
    { name: "Whistler" },
    { name: "North Vancouver" },
    { name: "Abbsfort" },
  ];

  const debounce = useDebouncedCallback((value) => handleDebounce(value), 500);

  const fetchCities = (query: string): City[] => {
    // TODO: Turn this into case insensitive
    return mockCities.filter((v) => v.name.includes(query));
  };

  const handleDebounce = (q: string) => {
    const foundCities = fetchCities(q);
    setCities(foundCities as []);
    console.log("Found Cities", cities);
  };

  const renderCitiesFound = () => {
    // TODO: Think about an empty state for the cities.
    return (
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {cities.map((city: City) => {
            return (
              <a href="#" className="dropdown-item">
                {city.name}
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  const renderInput = () => {
    return (
      <div className="container">
        <div className={cities.length > 0 ? "dropdown is-active" : "dropdown"}>
          <div className="dropdown-trigger">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Find a city!"
                  onChange={(e) => debounce.callback(e.target.value)}
                />
              </div>
            </div>
          </div>
          {renderCitiesFound()}
        </div>
      </div>
    );
  };

  return renderInput();
};

export default AutoComplete;
