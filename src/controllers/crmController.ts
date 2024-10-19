import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController{

    public async addNewContact(req: Request, res: Response) {
        try {
            let newContact = new Contact(req.body);
            const contact = await newContact.save();
            res.json(contact);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    public getContacts = async (req: Request, res: Response) => {           
        try {
            const contacts = await Contact.find({}); // No callback, just await
            res.json(contacts); // Respond with the contacts
        } catch (err) {
            res.status(500).send(err); // Send an error response
        }
    }

    public async getContactWithID(req: Request, res: Response){
        const { contactId } = req.params; // Extract contactId from the URL params
        console.log(`Fetching contact with ID: ${contactId}`); // Debug log
        try {
            const contact = await Contact.findById(contactId); // Use findById to fetch the contact
            if (!contact) {
                return res.status(404).send({ message: "Contact not found" }); // Handle case where contact is not found
            }
            res.status(200).json(contact); // Return the found contact
        } catch (err) {
            console.error('Error fetching contact:', err); // Log the error for debugging
            res.status(500).send(err); // Handle any errors
        }
    }

    public async updateContact(req: Request, res: Response) {           
        try {
            const contact = await Contact.findOneAndUpdate(
                { _id: req.params.contactId }, 
                req.body, 
                { new: true, useFindAndModify: false }
            );
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            res.json(contact);
        } catch (err) {
            res.status(500).send(err);
        }
    }    
    public async deleteContact(req: Request, res: Response){
        const { contactId } = req.params;
        try {
            const result = await Contact.deleteOne({ _id: contactId });
            if (result.deletedCount === 0) {
                return res.status(404).send({ message: "Contact not found" });
            }
            res.status(200).send({ message: "Contact successfully deleted" });
        } catch (err) {
            console.error('Error deleting contact:', err);
            res.status(500).send(err);
        }
    }
    
    
}