export const SAVE_DATA = 'SAVE_DATA';
export const SAVE_DAYINFO = 'SAVE_DAYINFO';

const initialState = {
  savedPhotos : [],
  daywiseData : [],
};

const mutatePhotos = (statePhotos, newPhotos) => {
  let newStatePhotos = [];
  newPhotos.forEach(pic => {
    if(statePhotos.findIndex(p=>p.id===pic.id) === -1){
      newStatePhotos.push(pic);
    }
  });
  return [...statePhotos, ...newStatePhotos];
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DAYINFO : 
      return {
        ...state,
        daywiseData: [...state.daywiseData, action.dayInfo],
      }
    case SAVE_DATA : 
      return {
        ...state,
        savedPhotos: mutatePhotos(state.savedPhotos, action.photos),
      }
    default:
      return state
  }
}

export const SavePhotos = (photos) => dispatch => {
  dispatch(savePhotos(photos));
};

export const SaveDayInfo = (dayInfo, photos=[]) => dispatch => {
  dispatch(saveDayData(dayInfo));
  dispatch(savePhotos(photos));
};


export const saveDayData = dayInfo => ({
  type: SAVE_DAYINFO,
  dayInfo,
});

export const savePhotos = photos => ({
  type: SAVE_DATA,
  photos,
});


