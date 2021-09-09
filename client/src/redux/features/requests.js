const initialState = {
  requests: [],
  loading: false,
  error: null
}

export default function requests(state = initialState, action) {
  switch (action.type) {
    case "requests/fetch/fulfilled":
      return {
        ...state,
        requests: action.payload
      }
    case "requests/fetch/rejected":
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export const fetchRequest = (medicationId, name, tel, email, message) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:4000/requests/${medicationId}`, {
        method: "POST",
        body: JSON.stringify({ name, tel, email, message, medicationId}),
        headers: { "Content-type": "application/json" }
      });
      const json = await response.json();

      if (json.error) {
        dispatch({ type: "requests/fetch/rejected", error: json.error });
      } else {
        dispatch({ type: "requests/fetch/fulfilled", payload: json });
      }

    } catch (e) {
      dispatch({ type: "requests/fetch/rejected", error: e.toString() });
    }
  };
}