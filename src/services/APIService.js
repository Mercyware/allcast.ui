import axios from "axios";
const baseURL = "https://allcast-a214f93321f5.herokuapp.com/api";

export const CheckDomainAvailability = async (domain) => {
    try {
        const response = await axios.get(`${baseURL}/domain/availability`, {
            params: {
                domain
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;

    }
}

export const BookDomain = async (domain, email) => {
    try {
        const response = await axios.post(`${baseURL}/domain/book`, {
            domain,
            email
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const CheckOut = async (body) => {
    const {transaction_id, amount, email} = body;
    console.log(transaction_id, amount, email);
    
    try {
        const response = await axios.post(`${baseURL}/payment/checkout`, {
            transaction_id,
            amount,
            email
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}