const moment = require('moment');
const { Op } = require('sequelize')
const { User, Appointment } = require('../models');

class BarberDashboardController {
	async index(req, res) {
		const appointments = await Appointment.findAll(
			{
				where: {
					provider_id: req.params.provider,
					date: {
						[Op.gt]: moment()
					}
				},
				order: [['date', 'ASC']]
			}
		)

		moment.locale('pt-br');

		const formated_appointments = appointments.map(async (appointment) => {
			const user = await User.findByPk(appointment.user_id);
			const date = moment(appointment.date).format('LLLL');

			return { date, client_avatar: user.avatar, client_name: user.name };
		})

		Promise.all(formated_appointments).then((appointments) => res.render('barber_dashboard', { appointments }));
	}
}

module.exports = new BarberDashboardController();