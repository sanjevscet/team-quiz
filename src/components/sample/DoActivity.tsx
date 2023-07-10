import {
  makeStyles,
  tokens,
  Button,
  useToastController,
  ToastTitle,
  Toast,
  useId,
  Toaster,
  Text,
  Checkbox,
  CheckboxProps,
} from "@fluentui/react-components";

import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import axios from "axios";
import { MySpinner } from "./MySpinner";
import { Env } from "../../Env";
import YouTube, { YouTubeProps } from "react-youtube";
import { CountdownTimer } from "./Countdown";

interface IActivity {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  time: number;
  image: string;
}

const useStyles = makeStyles({
  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalS,
  },
  wrapper: {
    columnGap: "15px",
    display: "flex",
  },
});

export function DoActivity() {
  const [activity, setActivity] = useState<IActivity>();
  const styles = useStyles();
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState<CheckboxProps["checked"]>(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { ApiEndpoint } = Env;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log({ value }); // Handle the form submission here
    dispatchToast(
      <Toast>
        <ToastTitle>Activity Submitted successfully</ToastTitle>
      </Toast>,
      { intent: "success" }
    );
    setIsSubmitted(true);
    setLoading(true);
    await axios.post(`${ApiEndpoint}/ee/doActivity`, activity);
    setLoading(false);
  };

  const getActivity = async () => {
    setLoading(true);
    const { data } = await axios.get(`${ApiEndpoint}/ee/doActivity`);
    setActivity(data);
    setLoading((l) => !l);
  };

  useEffect(() => {
    getActivity();
  }, []);

  console.log({ loading });

  const opts: YouTubeProps["opts"] = {
    height: "300",
    width: "520",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.field}>
      {loading ? (
        <MySpinner />
      ) : isSubmitted ? (
        <div>
          <Text size={800} style={{ color: "#00Ab12" }}>
            Thanks for completing activity. New Activity will be assigned soon.
          </Text>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ paddingBottom: 20 }}>
            <Text size={900}>
              "Physical activity boosts your mood and focus - a perfect break
              from your desk!"
            </Text>
            <br />
            <br />
            <br />
            <Text size={500} style={{ color: "#00ab12" }}>
              {activity?.title}
            </Text>
            <br />
            <br />
            <div style={{ display: "flex", alignItems: "self-start" }}>
              <div style={{ marginRight: "10px" }}>
                <Text size={500} style={{ color: "#0000ab" }}>
                  {activity?.description}
                  <div style={{ marginTop: 10 }}>
                    <CountdownTimer />
                  </div>
                </Text>
              </div>
              <div>
                {/* <img src={activity?.image} alt="img" style={{ width: 300 }} /> */}
                <YouTube
                  videoId="kdLSJuzRNUw"
                  opts={opts}
                  //   onReady={onPlayerReady}
                />
              </div>
            </div>

            <div>
              <Checkbox
                checked={checked}
                onChange={(ev, data) => setChecked(data.checked)}
                label="Completed"
                required
              />
            </div>

            {checked && (
              <div style={{ display: "flex", alignItems: "self-start" }}>
                <label
                  htmlFor="imageInput"
                  style={{ cursor: "pointer", marginTop: 8, color: "#00ab12" }}
                >
                  <Text size={400}>Upload your photo</Text>
                </label>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  required
                />
                {selectedImage && (
                  <div>
                    <img
                      src={selectedImage}
                      alt="Preview"
                      style={{ maxWidth: 400, maxHeight: 400, marginLeft: 15 }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <Button appearance="primary" type="submit">
            Submit
          </Button>
          <Button
            appearance="outline"
            style={{ marginLeft: 10 }}
            onClick={() => {
              //   setActivity({});
            }}
          >
            Clear
          </Button>
        </form>
      )}

      <Toaster toasterId={toasterId} />
    </div>
  );
}
