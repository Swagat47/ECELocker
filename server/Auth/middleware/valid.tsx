import { errorMonitor } from "events";
import { Request, Response, NextFunction } from "express";

export const validRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        name,
        email,
        password,
        rollnumber,
        personalemail,
        branch,
        programme,
        cgpa,
        percentage10th,
        percentage12th,
        backlogs,
        phone,
    } = req.body;
    const errors = [];
    if (rollnumber === undefined) {
        errors.push("Please add your rollnumber");
    }
    if (personalemail === undefined) {
        errors.push("Please add your personal email");
    }
    if (branch === undefined) {
        errors.push("Please add your branch");
    }
    if (programme === undefined) {
        errors.push("Please add your programme");
    }
    if (cgpa === undefined) {
        errors.push("Please add your cgpa");
    }
    if (percentage10th === undefined) {
        errors.push("Please add your 10th percentage");
    }
    if (percentage12th === undefined) {
        errors.push("Please add your 12th percentage");
    }
    if (backlogs === undefined) {
        errors.push("Please add your backlogs");
    }
    if (phone === undefined) {
        errors.push("Please add your phone number");
    }
    if (!name) {
        errors.push("Please add your name");
    } else if (name.length > 40) {
        errors.push("40 character limit");
    }
    if (!email) {
        errors.push("Email field is empty");
    } else if (!validateEmail(email)) {
        errors.push("use your college email");
    }

    if (password.length < 6) {
        errors.push("Password must be atleast 6 characters");
    }
    //TODO: use special characters in passwords
    if (errors.length > 0) {
        return res.status(400).json({ msg: errors });
        //console.log(errors)
    } else {
        next();
    }
};


export const validAdminRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        name,
        email,
        password,
        branch,
        phone,
        role,
    } = req.body;
    const errors = [];
    if (branch === undefined) {
        errors.push("Please add your branch");
    }
    if (phone === undefined) {
        errors.push("Please add your phone number");
    }
    if (!name) {
        errors.push("Please add your name");
    } else if (name.length > 40) {
        errors.push("40 character limit");
    }
    if (!email) {
        errors.push("Email field is empty");
    } else if (!validateAdminRegisterEmail(email)) {
        errors.push("Use correct email");
    }
    if(role === undefined){
        errors.push("Please add your role");
    }

    if (password.length < 6) {
        errors.push("Password must be atleast 6 characters");
    }
    //TODO: use special characters in passwords
    if (errors.length > 0) {
        return res.status(400).json({ msg: errors });
        //console.log(errors)
    } else {
        next();
    }
};

export function validateEmail(email: string) {
    //const regex = new RegExp("[a-z0-9]+@gmail.com");
    const regex = new RegExp("[a-z0-9]+@nith.ac.in");
    return regex.test(String(email).toLowerCase());
}


export function validateEmailContactUs(email: string) {
    const regex = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    //const regex = new RegExp("[a-z0-9]+@nith.ac.in");
    return regex.test(String(email).toLowerCase());
}

export function validateAdminRegisterEmail(email: string) {
    const regex = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    //const regex = new RegExp("[a-z0-9]+@nith.ac.in");
    return regex.test(String(email).toLowerCase());
}