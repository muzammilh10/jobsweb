// import React from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { Box, Button, InputBase } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const validationSchema = yup.object({
//   search: yup
//     .string("Enter your search query")
//     .required("This field cannot be empty"),
// });

// const SearchInputEl = () => {
//   const navigate = useNavigate();

//   const onSubmit = (values, actions) => {
//     const { search } = values;
//     if (search.trim()) {
//       navigate(`/search/${search}`);
//     } else {
//       navigate("/");
//     }
//   };

//   const {
//     values,
//     errors,
//     touched,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//     isSubmitting,
//   } = useFormik({
//     initialValues: {
//       search: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit,
//   });
//   return (
//     <form onSubmit={handleSubmit} style={{ width: "50%" }}>
//       <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
//         <InputBase
//           sx={{ bgcolor: "white", padding: "10px" }}
//           fullWidth={true}
//           id="search"
//           name="search"
//           label="search"
//           placeholder="ex: developer, front end"
//           value={values.search}
//           onBlur={handleBlur}
//           onChange={handleChange}
//           error={touched.search && Boolean(errors.search)}
//         />
//         <Button
//           color="primary"
//           variant="contained"
//           type="submit"
//           disabled={isSubmitting}
//         >
//           Search
//         </Button>
//       </Box>
//       <Box component="span" sx={{ color: "orange" }}>
//         {touched.search && errors.search}
//       </Box>
//     </form>
//   );
// };

// export default SearchInputEl;
// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { Box, Button, InputBase } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const validationSchema = yup.object({
//   search: yup
//     .string("Enter your search query")
//     .required("This field cannot be empty"),
// });

// const SearchInputEl = () => {
//   const navigate = useNavigate();
//   const [isListening, setIsListening] = useState(false);
//   const [recognizedText, setRecognizedText] = useState("");

//   const handleSpeechRecognition = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       console.error("Speech recognition not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();

//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//       setIsListening(true);
//       setRecognizedText("");
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setRecognizedText((prevText) => prevText + transcript);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognition.start();
//   };

//   const handleSearchChange = (event) => {
//     const { value } = event.target;
//     setRecognizedText(value);
//   };

//   const onSubmit = async (values) => {
//     const { search } = values;
//     if (search.trim()) {
//       const decodedSearchQuery = decodeURIComponent(search.trim());
//       navigate(`/search/${decodedSearchQuery}`);
//     } else {
//       navigate("/");
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       search: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit,
//   });

//   useEffect(() => {
//     // Start speech recognition only when the user clicks "Start Listening" button
//     if (isListening && !formik.isSubmitting) {
//       handleSpeechRecognition();
//     }
//   }, [isListening, formik.isSubmitting]);

//   useEffect(() => {
//     // When recognition is complete, update the formik field and submit the form
//     if (!isListening && recognizedText) {
//       formik.setFieldValue("search", recognizedText, true);
//       formik.handleSubmit();
//     }
//   }, [isListening, recognizedText, formik]);

//   return (
//     <form onSubmit={formik.handleSubmit} style={{ width: "50%" }}>
//       <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
//         <InputBase
//           sx={{ bgcolor: "white", padding: "10px" }}
//           fullWidth={true}
//           id="search"
//           name="search"
//           label="search"
//           placeholder="ex: developer, front end"
//           value={formik.values.search}
//           onBlur={formik.handleBlur}
//           onChange={handleSearchChange}
//           error={formik.touched.search && Boolean(formik.errors.search)}
//         />
//         <Button
//           color="primary"
//           variant="contained"
//           type="submit"
//           disabled={formik.isSubmitting}
//         >
//           Search
//         </Button>
//         <Button
//           color="primary"
//           variant="contained"
//           onClick={() => setIsListening(!isListening)}
//         >
//           {isListening ? "Stop Listening" : "Start Listening"}
//         </Button>
//       </Box>
//       <Box component="span" sx={{ color: "orange" }}>
//         {formik.touched.search && formik.errors.search}
//       </Box>
//     </form>
//   );
// };

// export default SearchInputEl;
// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { Box, Button, InputBase } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import MicIcon from "@mui/icons-material/Mic";
// import MicOffIcon from "@mui/icons-material/MicOff";
// const validationSchema = yup.object({
//   search: yup
//     .string("Enter your search query")
//     .required("This field cannot be empty"),
// });

// const SearchInputEl = () => {
//   const navigate = useNavigate();
//   const [isListening, setIsListening] = useState(false);
//   const [recognizedText, setRecognizedText] = useState("");
//   const [searchFromSpeech, setSearchFromSpeech] = useState("");

//   const handleSpeechRecognition = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       console.error("Speech recognition not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();

//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//       setIsListening(true);
//       setRecognizedText("");
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setRecognizedText((prevText) => prevText + transcript);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognition.start();
//   };

//   const handleSearchChange = (event) => {
//     const { value } = event.target;
//     setRecognizedText(value);
//   };

//   const onSubmit = async (values) => {
//     const { search } = values;
//     const searchToSubmit = searchFromSpeech || search;
//     if (searchToSubmit.trim()) {
//       const decodedSearchQuery = decodeURIComponent(searchToSubmit.trim());
//       navigate(`/search/${decodedSearchQuery}`);
//     } else {
//       navigate("/");
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       search: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit,
//   });

//   useEffect(() => {
//     if (isListening && !formik.isSubmitting) {
//       handleSpeechRecognition();
//     }
//   }, [isListening, formik.isSubmitting]);

//   useEffect(() => {
//     if (!isListening && recognizedText) {
//       setSearchFromSpeech(recognizedText);
//       formik.setFieldValue("search", recognizedText, true);
//       formik.handleSubmit();
//     }
//   }, [isListening, recognizedText, formik]);

//   return (
//     <form onSubmit={formik.handleSubmit} style={{ width: "50%" }}>
//       <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
//         <InputBase
//           sx={{ bgcolor: "white", padding: "10px" }}
//           fullWidth={true}
//           id="search"
//           name="search"
//           label="search"
//           placeholder="ex: developer, front end"
//           value={searchFromSpeech || formik.values.search}
//           onBlur={formik.handleBlur}
//           onChange={handleSearchChange}
//           error={formik.touched.search && Boolean(formik.errors.search)}
//         />
//         <Button
//           color="primary"
//           variant="contained"
//           type="submit"
//           disabled={formik.isSubmitting}
//         >
//           Search
//         </Button>
//         <Button
//           color="primary"
//           variant="contained"
//           onClick={() => setIsListening(!isListening)}
//         >
//           {isListening ? <MicOffIcon /> : <MicIcon />}
//         </Button>
//       </Box>
//       <Box component="span" sx={{ color: "orange" }}>
//         {formik.touched.search && formik.errors.search}
//       </Box>
//     </form>
//   );
// };

// export default SearchInputEl;
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

const validationSchema = yup.object({
  search: yup.string().required("This field cannot be empty"),
});

const SearchInputEl = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [searchFromSpeech, setSearchFromSpeech] = useState("");

  const handleSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setRecognizedText("");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText((prevText) => prevText + transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setRecognizedText(value);
  };

  const onSubmit = async (values) => {
    const { search } = values;
    const searchToSubmit = searchFromSpeech || search;
    if (searchToSubmit.trim()) {
      const decodedSearchQuery = decodeURIComponent(searchToSubmit.trim());
      navigate(`/search/${decodedSearchQuery}`);
    } else {
      navigate("/");
    }
  };

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (isListening && !formik.isSubmitting) {
      handleSpeechRecognition();
    }
  }, [isListening, formik.isSubmitting]);

  useEffect(() => {
    if (!isListening && recognizedText) {
      setSearchFromSpeech(recognizedText);
      formik.setFieldValue("search", recognizedText, true);
      formik.handleSubmit();
    }
  }, [isListening, recognizedText, formik]);

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "50%" }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <InputBase
          sx={{ bgcolor: "white", padding: "10px" }}
          fullWidth
          id="search"
          name="search"
          label="search"
          placeholder="ex: developer, front end"
          value={searchFromSpeech || formik.values.search}
          onBlur={formik.handleBlur}
          onChange={handleSearchChange}
          error={formik.touched.search && Boolean(formik.errors.search)}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Search
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setIsListening(!isListening)}
        >
          {isListening ? <MicOffIcon /> : <MicIcon />}
        </Button>
      </Box>
      <Box component="span" sx={{ color: "orange" }}>
        {formik.touched.search && formik.errors.search}
      </Box>
    </form>
  );
};

export default SearchInputEl;
