import { types } from "./types";
import axios from "axios";

import api from "../api/contact";

export const createContact = (data) => ({
    type: types.CREATE_CONTACT,
    payload: api.createContact(data),
});
