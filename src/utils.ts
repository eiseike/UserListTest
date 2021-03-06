import {Action, ActionCreatorWithOptionalPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {RootActions} from "./store";
import { Pages } from "./store/reducers/pageState";

export const serverUrl = "http://js-assessment-backend.herokuapp.com";

interface IHash {
    page?: Pages;
    userId?: string;
}

export function getHash(): IHash {
    const hash = window.location.hash.substr(1);
    return hash.split("&").reduce((acc: {[key: string]: any}, el) => {
        const data = el.split("=");
        if (data.length === 2) { acc[data[0]] = data[1]; }
        return acc;
    }, {});
}

export function setHash(data: { [key: string]: any } = {}, noPush= false) {
    data = isObject(data) ? data : {};
    const hash = Object.keys(data).reduce((acc: string, el: any) => {
        if (data[el] === null || data[el] === undefined) {return acc}
        acc += `${el}=${data[el]}&`;
        return acc;
    }, "/#").slice(0, -1);
    noPush ? history.replaceState(data, "", hash) : history.pushState(data, "", hash);
}

export function isObject(value: any) {
    return value && typeof value === "object" && value.constructor === Object;
}

export function actionMatcher(matchers: Array<ActionCreatorWithPayload<any, string>>, action: RootActions) {
    return matchers.some((matcher) => matcher.match(action));
}
