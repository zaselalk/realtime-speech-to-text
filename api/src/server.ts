import express, { Application } from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
dotenv.config();

const { SPEECH_KEY, SPEECH_REGION } = process.env;
// create an instance of express application
const app: Application = express();

// set cros middleware
app.use(cors());

app.get("/api/get-speech-token", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const speechKey = process.env.SPEECH_KEY;
  const speechRegion = process.env.SPEECH_REGION;

  if (!speechKey || !speechRegion) {
    throw new Error(
      "Please set SPEECH_KEY and SPEECH_REGION in your .env file"
    );
  }

  const headers = {
    headers: {
      "Ocp-Apim-Subscription-Key": speechKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const tokenResponse = await axios.post(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      null,
      headers
    );
    res.send({ token: tokenResponse.data, region: speechRegion });
  } catch (err) {
    res.status(401).send("There was an error authorizing your speech key.");
  }
});

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
