import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";

// function medications(state = initialState, action) {
//   switch (action.type) {
//     case "medications/fetch/pending":
//       return {
//         ...state,
//         loading: true,
//       };
//     case "medications/fetch/fulfilled":
//       return {
//         ...state,
//         loading: false,
//         medications: action.payload,
//       };
//     case "medications/remove/fulfilled":
//       return {
//         ...state,
//         medications: state.medications.filter(
//           (item) => item !== action.payload
//         ),
//       };
//     default:
//       return state;
//   }
// }

// export const addMedication = (
//   name,
//   price,
//   description,
//   category,
//   img,
//   expiryDate,
//   hasRecipe
// ) => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch("/medications", {
//         method: "POST",
//         body: JSON.stringify({
//           name,
//           price,
//           descr: description,
//           category,
//           img,
//           expiryDate,
//           hasRecipe,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const json = await response.json();
//
//       dispatch({ type: "medications/add-medication/fulfilled", payload: json });
//     } catch (e) {
//       dispatch({
//         type: "categories/add-medication/rejected",
//         error: e.toString(),
//       });
//     }
//   };
// };

// export const removeMedication = (id) => {
//   return async (dispatch) => {
//     try {
//       await fetch(`/medications/${id}`, {
//         method: "DELETE",
//       });
//
//       dispatch({ type: "medications/remove/fulfilled", payload: id });
//     } catch (e) {
//       dispatch({ type: "medications/remove/rejected", error: e.toString() });
//     }
//   };
// };

interface Category {
  _id?: string;
  name: string;
}

export interface Medication {
  _id?: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  img: string;
  hasRecipe: boolean;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
}

interface MedicationsState {
  medications: Medication[];
  loading: boolean;
  error: SerializedError | null;
}

const initialState: MedicationsState = {
  medications: [],
  loading: false,
  error: null,
};

export const getMedications = createAsyncThunk(
  "medications/fetch",
  async (_, { rejectWithValue }) => {
    const response = await axios.get("/medications");

    if (!response.data.ok) {
      rejectWithValue(response.data.error);
    }

    return response.data;
  }
);

interface AddMedicationProps {
  name: string;
  price: number;
  description: string;
  category: string;
  img: string;
  expiryDate: string;
  hasRecipe: boolean;
}

export const addMedication = createAsyncThunk(
  "medications/add-medication",
  async (payload: AddMedicationProps, { rejectWithValue }) => {
    const response = await axios.post("/medications", {
      ...payload,
    });

    if (!response.data.ok) {
      rejectWithValue(response.data.error);
    }

    return response.data;
  }
);

interface RemoveMedicationProps {
  id: string;
}

export const removeMedication = createAsyncThunk(
  "medications/add-medication",
  async (payload: RemoveMedicationProps, { rejectWithValue }) => {
    const response = await axios.delete(`/medications/${payload.id}`);

    if (!response.data.ok) {
      rejectWithValue(response.data.error);
    }

    return response.data;
  }
);

const medicationsSlice = createSlice({
  name: "medications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMedications.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMedications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(getMedications.fulfilled, (state, action) => {
      state.medications.push({
        _id: "ads",
        name: "string",
        price: 12,
        description: "string",
        category: {
          _id: "asd",
          name: "asd",
        },
        img: "string",
        hasRecipe: false,
        expiryDate: "string",
        createdAt: "string",
        updatedAt: "string",
      });
      state.loading = false;
      state.error = null;
    });

    builder.addCase(addMedication.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addMedication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(addMedication.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.medications.push(action.payload);
    });

    builder.addCase(removeMedication.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeMedication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(removeMedication.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.medications.find((item) => action.payload === item._id);
    });
  },
});

export const {} = medicationsSlice.actions;

export default medicationsSlice.reducer;
