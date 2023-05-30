import { useReducer } from "react";
import { container } from "../../services/storage/context.container";
import { APIService } from "../../services/api/request";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import { buildQueryString } from "../../services/utils/url";
import { destroyMessage, showMessage } from "../../utils";

const ApiRoutes = {
  base: `/groups`,
};

export type StateType = {
  minimalDocuments: any;
  documents: any;
  pagination: any;
  group: any;
  subDocuments: any;
};

const initialState: StateType = {
  documents: [],
  subDocuments: [],
  pagination: {},
  group: {},
  minimalDocuments: [],
};

const reducer = (
  state: StateType,
  action: {
    type: string;
    payload?: any;
  }
) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_MININAL_GROUPS":
      return {
        ...state,
        minimalDocuments: payload.map((x: any) => ({
          value: x.id,
          label: x.name,
        })),
      };
    case "GET_GROUPS":
      return { ...state, ...payload };
    case "GET_ONE_GROUP":
      return { ...state, group: { ...payload } };
    case "CLEAR_ONE_GROUP":
      return { ...state, group: {} };
    case "UPDATE_SUB_CLIENT":
      return { ...state, subDocuments: [...payload] };  
    default:
      return state;
  }
};

export const { useContext: useGroups, Provider: GroupProvider } = container(
  () => {
    const [state, dispatch] = useReducer(reducer, {
      ...initialState,
    });


    
    const getAllGroups = (
      mininal?: boolean,
      params?: any,
      callback?: (data: any) => void
    ) => {
      showMessage();
      if (params) {
        if (!params.parent) {
          params.parent = null;
        }
        params = buildQueryString(params);
      }
      APIService.get(
        mininal
          ? `${ApiRoutes.base}?all=true`
          : `${ApiRoutes.base}${params ? `${params}` : ""}`,
        undefined,
        process.env.REACT_APP_API_ENDPOINT
      )
        .then((res: any) => {
          destroyMessage('loading');
          const response: any = res.data;
          if (mininal) {
            dispatch({ type: "GET_MININAL_GROUPS", payload: response });
          } else {
            dispatch({ type: "GET_GROUPS", payload: response });
          }
          if (typeof callback === "function") {
            callback(response);
          }
        })
        .catch((error: any) => {
          if (typeof error === "object" && error.status) {
            message.error(error.message);
          }
        });
    };

    const updateOne = (
      id: string,
      data: any,
      callback?: (data: any) => void
    ) => {
      APIService.put(
        `${ApiRoutes.base}/${id}`,
        data,
        process.env.REACT_APP_API_ENDPOINT
      )
        .then((res: any) => {
          message.success("Updated Successfully!!!");
          getOneGroup(id);
          if (typeof callback === "function") {
            callback({});
          }
        })
        .catch((error: any) => {
          if (typeof error === "object" && error.status) {
            message.error(error.message);
          }
        });
    };

    const createOne = (data: any, callback?: (data: any) => void) => {
      APIService.post(
        `${ApiRoutes.base}`,
        data,
        process.env.REACT_APP_API_ENDPOINT
      )
        .then((res: any) => {
          message.success("Created Successfully!!!");
          // history.goBack();
          getAllGroups();
          if (typeof callback === "function") {
            callback({});
          }
        })
        .catch((error: any) => {
          if (typeof error === "object" && error.status) {
            message.error(error.message);
          } else {
            message.error("Group Creation Failed");
          }
        });
    };

    const getOneGroup = (id: string, callback?: (data: any) => void) => {
      APIService.get(
        `${ApiRoutes.base}/${id}`,
        undefined,
        process.env.REACT_APP_API_ENDPOINT
      )
        .then((res: any) => {
          const response: any = res.data;
          dispatch({ type: "GET_ONE_GROUP", payload: response });
          if (typeof callback === "function") {
            callback(response);
          }
        })
        .catch((error: any) => {
          if (typeof error === "object" && error.status) {
            message.error(error.message);
          }
        });
    };
    const deleteGroup = (id: string, callback?: (response: any) => void) => {
      APIService.delete(
        `${ApiRoutes.base}/${id}`,
        {},
        process.env.REACT_APP_API_ENDPOINT
      )
        .then((response: any) => {
          callback && callback(response);
        })
        .catch((err: any) => {});
    };

    const getSubClients = (id?: any, callback?: (data: any) => void) => {
      APIService.get(
        `${ApiRoutes.base}?filter[parent]=${id}`,
        undefined,
        process.env.REACT_APP_API_ENDPOINT
      )
        .then((res: any) => {
          dispatch({ type: "UPDATE_SUB_CLIENT", payload: res.data.documents });
        })
        .catch((error: any) => {
          if (typeof error === "object" && error.status) {
            message.error(error.message);
          }
        });
    };

    return {
      state,
      actions: {
        getAllGroups,
        getSubClients,
        getOneGroup,
        updateOne,
        createOne,
        deleteGroup,
        clearOne: () => dispatch({ type: "CLEAR_ONE_GROUP", payload: {} }),
      },
    };
  }
);