import { useReducer } from "react";
import { DestinationSearchInitialState, DestinationSearchContext, DestinationSearchDispatchContext } from "./appStore";
import { DestinationSearchReducer } from "./reducers";

export const DestinationSearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(DestinationSearchReducer, DestinationSearchInitialState);

    return (
        <DestinationSearchContext.Provider value={state}>
            <DestinationSearchDispatchContext.Provider value={dispatch}>
                {children}
            </DestinationSearchDispatchContext.Provider>
        </DestinationSearchContext.Provider>
    );
}