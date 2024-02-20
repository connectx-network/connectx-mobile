import {Payload} from '@model';
import {createSlice} from '@reduxjs/toolkit';

export interface ITypeVehicleState {
  total: number;
  data: Array<{
    name: string;
    id: number;
    ma: string;
  }>;
}

const initialState: ITypeVehicleState = {
  total: 0,
  data: [],
};

export const typeVehicleSlice = createSlice({
  name: 'typeVehicle',
  initialState,
  reducers: {
    actionUpdateTypeVehicle(state, action: Payload<ITypeVehicleState>) {
      return (state = {
        ...state,
        ...action.payload,
      });
    },
  },
});

export const {actionUpdateTypeVehicle} = typeVehicleSlice.actions;
export default typeVehicleSlice.reducer;
