import React from "react";
import { Checkbox, Button, Text } from "@fluentui/react-components";

interface ISelectActivity {
  activities: string[];
  setUserActivities: (value: string[]) => void;
}

export function SelectActivity(props: ISelectActivity) {
  console.log(props);
  const activities = props.activities;

  //   const [checked, setChecked] = React.useState<CheckboxProps["checked"]>(true);
  const [value, setValue] = React.useState<any[]>([]);

  return (
    <div>
      <Text
        size={400}
        style={{ display: "block", marginTop: 20, marginBottom: 20 }}
      >
        Kindly select your area of interests:
      </Text>
      {/* {JSON.stringify(props)} */}
      {activities.map((activity: string, index: number) => {
        return (
          <Checkbox
            checked={value[index]?.status}
            onChange={(ev, data) => {
              //   setChecked(data.checked);
              setValue((prevItems) => {
                const updatedItems = [...prevItems];
                updatedItems[index] = {
                  ...updatedItems[index],
                  status: data.checked,
                  name: activity,
                };
                return updatedItems;
              });
            }}
            label={activity}
          />
        );
      })}
      {/* {JSON.stringify(value)} */}
      <br />
      <div style={{ marginTop: 20 }}>
        <Button
          appearance="primary"
          onClick={() => {
            console.log("skjkjk");
            console.log({ value });
            const checkedValues = value
              .filter((v) => v?.status)
              .map((v) => v?.name);
            console.log({ checkedValues });
            setValue(checkedValues);
            props.setUserActivities(checkedValues);
          }}
        >
          Submit Selection
        </Button>
        <Button
          appearance="outline"
          style={{ marginLeft: 10 }}
          onClick={() => {
            setValue([]);
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default SelectActivity;
