/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 * @description This hook provides methods to interact with external APIs.
 */

import emailjs from "@emailjs/browser"
import ReactGA from "react-ga4"
import {useConstants} from "@/hooks/constants.js"
import {useUtils} from "@/hooks/utils.js"

export const useApi = () => {
    const constants = useConstants()
    const utils = useUtils()

    const validators = {
        /**
         * @param {String} name
         * @param {String} email
         * @param {String} subject
         * @param {String} message
         */
        validateEmailRequest: (name, email, subject, message) => {
            const minWordCountForMessage = 3

            const validations = [
                { errorCode: constants.ErrorCodes.VALIDATION_EMPTY_FIELDS,      errorCondition: !name || !email || !subject || !message },
                { errorCode: constants.ErrorCodes.VALIDATION_EMAIL,             errorCondition: !utils.validation.validateEmail(email) },
                { errorCode: constants.ErrorCodes.VALIDATION_MESSAGE_LENGTH,    errorCondition: !utils.validation.isLongerThan(message, minWordCountForMessage),    messageParameter: minWordCountForMessage + 1},
                { errorCode: constants.ErrorCodes.VALIDATION_MESSAGE_SPAM,      errorCondition: utils.validation.isSpam(message) },
            ]

            const error = validations.find(validation => validation.errorCondition)
            return {
                success: !error,
                errorCode: error?.errorCode,
                errorParameter: error?.messageParameter,
                bundle: {
                    name: name,
                    from_name: name,
                    email: email,
                    from_email: email,
                    custom_subject: subject,
                    message: message,
                    custom_source: utils.url.getAbsoluteLocation(),
                    custom_source_name: "React Portfolio"
                }
            }
        }
    }

    const handlers = {
        /**
         * @return {Promise<{success: (*|boolean)}>}
         */
        dummyRequest: async () => {
            await new Promise((resolve) => setTimeout(resolve, 700))
            window._dummyRequestSuccess = !window._dummyRequestSuccess

            return {
                success: window._dummyRequestSuccess
            }
        },

        /**
         * @param {Object} validationBundle
         * @param {String} publicKey
         * @param {String} serviceId
         * @param {String} templateId
         * @return {Promise<{success: boolean}>}
         */
        sendEmailRequest: async (validationBundle, publicKey, serviceId, templateId) => {
            emailjs.init(publicKey)

            const response = {success: false}

            try {
                const result = await emailjs.send(serviceId, templateId, validationBundle)
                response.success = result.status === 200
            } catch (error) {
                response.success = false
            }

            return response
        }
    }

    const analytics = {
        /**
         * @description Initializes Google Analytics if a Measurement ID is provided.
         */
        init: (id) => {
            if (id) {
                window._gaMeasurementId = id
                ReactGA.initialize(id)
            }
        },

        /**
         * @description This method can be used to report a visit to an external analytics service.
         * Here, you can integrate Google Analytics, Mixpanel, or your own custom analytics implementation.
         * @returns {Promise<void>}
         */
        reportVisit: async() => {
            const measurementId = window._gaMeasurementId
            if (measurementId) {
                ReactGA.send({ hitType: "pageview", page: window.location.pathname })
            }

            // Keep the mock call for now or remove it if preferred
            try {
                await fetch("https://admin.ryanbalieiro.com/api/analytics/mock", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        params: {
                            url: utils.url.getRootLocation(),
                            template_id: "react-portfolio"
                        }
                    })
                })
            } catch (e) {
                // Ignore mock errors
            }
        },

        /**
         * @description Reports a specific event to Google Analytics.
         * @param {string} category
         * @param {string} action
         * @param {string} [label]
         */
        reportEvent: (category, action, label) => {
            const measurementId = window._gaMeasurementId
            if (measurementId) {
                ReactGA.event({
                    category: category,
                    action: action,
                    label: label
                })
            }
        }
    }

    return {
        validators,
        handlers,
        analytics
    }
}
