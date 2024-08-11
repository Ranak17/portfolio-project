import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ServerError } from "../models/serverError";
import axios from "axios";
import agent from "../api/agent";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null | undefined = localStorage.getItem('jwt');
    appLoaded = false;
    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('jwt', token);
                } else {
                    localStorage.removeItem('jwt');
                }
            }
        )
    }


    setServorError(error: ServerError) {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        this.appLoaded = true;
    }
}