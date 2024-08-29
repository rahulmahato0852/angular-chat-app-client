export interface Response {
    message: string
}

export interface loginData {
    userName: string,
    password: string
}

export interface verifyOtpData {
    userName: string,
    otp: number
}
export interface verifyOtpResponse {
    name: string,
    hero: string,
    email: string,
    mobile: string,
    _id: string
}

