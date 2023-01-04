import React, { createContext, useReducer, Dispatch } from 'react';
import { GraphData, Graph } from '@antv/g6';

export enum ENodeMakeActionType {
    UPDTAE = 'UPDATE',
    DELETE = 'DELETE',
    ADD = 'ADD',
    INIT = 'INIT',
}

export interface INodeMakeState {
    nodes: GraphData[];
    dispatch: Dispatch<{ type: ENodeMakeActionType, payload: any }>;
    graph?: Graph | null,
    refresh: (value: string) => void;
}

const initialState: INodeMakeState = {
    nodes: [],
    dispatch: (() => {}),
    graph: null,
    refresh: () => {}
};

const nodeMakeReducer = (state: INodeMakeState['nodes'], action: { type: ENodeMakeActionType, payload: any }) => {
    switch (action.type) {
        case ENodeMakeActionType.INIT: {
            return { ...state, nodes: action.payload }
        }
        default: {
            return state;
        }
    }
}

export const NodeMakeContext = createContext<INodeMakeState>(initialState);

export const NodeMakeWrapper = function(props: { children: any, value: any }) {
    const [store, dispatch] = useReducer(nodeMakeReducer, initialState.nodes);
    return (
        <NodeMakeContext.Provider value={{ nodes: store, dispatch, ...props.value }}>
            {props.children}
        </NodeMakeContext.Provider>
    );
}
