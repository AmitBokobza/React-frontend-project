import Card from "../interfaces/Card/Card";
import User from "../interfaces/User";

export const normalizeUser = (values:any) :User=> {
    return {
        name:{
            first:values.first,
            middle:values.middle,
            last:values.last
        },
        phone: values.phone,
        email: values.email,
        password: values.password,
        image:{
            url: values.url,
            alt: values.alt
        },
        address:{
            state: values.state,
            country: values.country,
            city: values.city,
            street: values.street,
            houseNumber: values.houseNum,
            zip: values.zip
        },
        isBusiness: values.isBusiness
    }
}

export const normalizeCard = (values:any) :Card=> {
    return {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        phone: values.phone,
        email: values.email,
        web: values.web,
        image: {
            url: values.url,
            alt: values.alt
        },
        address: {
            state: values.state,
            country: values.country,
            city: values.city,
            street: values.street,
            houseNumber: values.houseNum,
            zip: values.zip
        }
    }
}