const stateChange = (e) => {
     let value = JSON.parse(e.target.value);
     let state = e.target.label;
     let city = e.target.label;
     console.log(value);
     setTrackValue((values) => ({
       ...values,
       state: value.id,
     }));
     console.log(trackvalue);
   };
 
   console.log(trackvalue);

    {/* <select name="state" onChange={stateChange}>
                {states &&
                  states.map((item, i) => (
                    <option
                      value={JSON.stringify({
                        id: item.state_id,
                        name: item.name,
                      })}
                    >
                      {item.name}
                    </option>
                  ))}
              </select> */}