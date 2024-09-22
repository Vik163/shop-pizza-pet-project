const appYaId = process.env.REACT_APP_YA_CLIENT_ID;
const appYaIdServer = process.env.REACT_APP_YA_CLIENT_ID_SERVER;

export const yaClientId = appYaIdServer || appYaId;
