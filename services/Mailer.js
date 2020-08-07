const sendgrid = require('sendgrid');
const helper = require('sendgrid').mail;
const keys = require('../config/keys');
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(keys.sendGridKey);

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('bharadwajplus@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        // console.log(response);
        return response;
    }
}

// remove
// class Mailer{
//      subject;
//      recipients;
//      content;
//      title;
//     constructor({title, subject, recipients}, content){
//             // this.from_mail = new helper.Email('no-reply@emaily.com');
//             this.subject = subject;
//             console.log(subject);
//             this.content = content;
//             console.log(content);
//             // console.log(recipients);
//             // this.content = content;
//             // this.recipients = this.formatAddresses(recipients);
//             this.recipients = recipients;
//             // console.log(recipients);
//             this.title = title;
//             // this.body = body;
//             // this.addContent(this.body);
//             // this.addClickTracking();
//             // this.addRecipients();
//     }
//     formatAddresses(recipients){
//         let s=recipients[0].email; 
//         var i;     
//         for (i = 1; i < recipients.length; i++) {
//             s += ","+recipients[i].email;
//           }
//         console.log(s);   
//         return s.split(',');             
//     }

//     async send(){
//         const sgMail = require('@sendgrid/mail');
//         sgMail.setApiKey(keys.sendGridKey);
//         const msg = {
//             to: this.formatAddresses(this.recipients),
//             // to: ['drbha143@gmail.com','bharadwajsoftware@gmail.com'],
//             from: 'Bharadwaj <bharadwajplus@gmail.com>',
//             title: this.title,
//             subject:this.subject,
//             // body: this.body,
//             // text: 'Fresh donuts are out of the oven. Get them while they’re hot!',
//             html: this.content,
//             // _user: req.user.id,
//             // dateSent: Date.now()
//         };
//         return sgMail.sendMultiple(msg);
//     }
// } 
    
        // const msg = {
        // to: recipients.split(','),
        // from: 'Bharadwaj <bharadwajplus@gmail.com>',
        // title,
        // subject,
        // body,
        // text: 'Fresh donuts are out of the oven. Get them while they’re hot!',
        // html: '<p>Fresh donuts are out of the oven. Get them while they’re <em>hot!</em></p>',
        // _user: req.user.id,
        // dateSent: Date.now()
        // };

        // sgMail.sendMultiple(msg).then(() => {
        // console.log('emails sent successfully!');
        // }).catch(error => {
        // console.log(error);
        // });
//    } 
// class Mailer extends helper.Mailer {
//     constructor({subject, recipients}, content){
//         super();
//         this.sgApi = sendgrid(keys.sendGridKey);
//         this.from_mail = new helper.Email('no-reply@emaily.com');
//         this.subject = subject;
//         this.body = new helper.Content('text/html', content);
//         this.recipients = this.formatAddresses(recipients);
//         this.addContent(this.body);
//         this.addClickTracking();
//         this.addRecipients();
//     }
//     formatAddresses(recipients){
//         return recipients.map(({email})=>{
//             return new helper.Email(email);
//         }); 
//     }
//     addClickTracking(){
//         const trackingSettings = new helper.TrackingSettings();
//         const clickTracking = new helper.ClickTracking(true,true);
//         trackingSettings.setClickTracking(clickTracking);
//         this.addTrackingSettings(trackingSettings);
//     }
//     addRecipients(){
//         const personalize = new helper.Personalization();
//         this.recipients.forEach(recipient=>{
//             personalize.addTo(recipient);
//         });
//         this.addPersonalization(personalize);
//     }

//     async send(){
//         const request =this.sgApi.emptyRequest({
//             method: 'POST',
//             path: '/v3/mail/send',
//             body: this.toJSON()
//         });

//         // cosnt response = this.sgApi.API(request);
//         return this.sgApi.API(request);
//     }

// }

module.exports = Mailer;