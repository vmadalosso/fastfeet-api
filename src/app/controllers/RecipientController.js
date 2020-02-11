import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name, zipcode: req.body.zipcode },
    });

    if (recipientExists) {
      return res.status(400).json({ message: 'Recipient already exists' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });
  }

  // async update(req, res) {
  //   const schema = Yup.object().shape({
  //     name: Yup.string(),
  //     street: Yup.string(),
  //     number: Yup.number(),
  //     complement: Yup.string(),
  //     state: Yup.string(),
  //     city: Yup.string(),
  //     zipcode: Yup.string(),
  //   });

  //   if (!(await schema.isValid(req.body))) {
  //     return res.status(400).json({ error: 'Validation failed' });
  //   }

  //   const { id } = req.params;

  //   const recipient = await Recipient.findByPk(id);

  //   if (!recipient) {
  //     return res.status(401).json({ error: 'Recipient does not exist' });
  //   }

  //   const {
  //     name,
  //     street,
  //     number,
  //     complement,
  //     state,
  //     city,
  //     zipcode,
  //   } = await Recipient.update(req.body);

  //   return res.json({
  //     id,
  //     name,
  //     street,
  //     number,
  //     complement,
  //     state,
  //     city,
  //     zipcode,
  //   });
  // }
}

export default new RecipientController();
