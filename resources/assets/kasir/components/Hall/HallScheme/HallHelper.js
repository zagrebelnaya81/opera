function getSeatColor(status) {
    switch (status) {
        case "booked":
            return `#BDBDBD`;
        case "vip_booked":
            return `#a1887f`;
        case "distributor_booked":
            return `#909499`;
        case "sold":
            return `#FAFAFA`;
        default:
            return `#F5F5F5`;
    }
}
function getTextColor(status) {
  switch (status) {
    case "vip_booked":
        // return `#400040`;
        return `#a1887f`;
    case "distributor_booked":
      return `#333`;
    default:
      return `#333`;
  }
}

function addClassForElements(parentEl, query, classToAdd) {
    parentEl.querySelectorAll(query).forEach(item => {
        item.classList.add(classToAdd);
    });
}

function removeClassForElements(parentEl, query, classToAdd) {
    parentEl.querySelectorAll(query).forEach(item => {
        item.classList.remove(classToAdd);
    });
}

module.exports = {
    addClassForElements: (parentEl, query, classToAdd) =>
        addClassForElements(parentEl, query, classToAdd),

    removeClassForElements: (parentEl, query, classToAdd) =>
        removeClassForElements(parentEl, query, classToAdd),

    getSeatColor: status => getSeatColor(status),

    getSeatConfigForOrder: (target, orderData) => {
        const order = orderData[0];
        return {
            sectionName: target
                .closest(`[data-section]`)
                .getAttribute(`data-name-ua`),
            row: target.closest(`[data-row]`).getAttribute(`data-row`),
            seat: target.querySelector(`text`).textContent,
            price: target.getAttribute(`data-price`),
            ticketId: target.getAttribute(`data-id`),
            coordinates: target.getBoundingClientRect(),
            ticketsAmount: order.tickets.data.length,
            seller: order.seller,
            bookedFor: order.name,
            status: order.status,
            orderPrice: order.tickets.data.reduce((total, ticket) => {
                return total + ticket.full_price;
            }, 0)
        };
    },

    getSeatConfig: target => {
        return {
            sectionName: target
                .closest(`[data-section]`)
                .getAttribute(`data-name-ua`),
            row: target.closest(`[data-row]`).getAttribute(`data-row`),
            seat: target.querySelector(`text`).textContent,
            price: target.getAttribute(`data-price`),
            ticketId: target.getAttribute(`data-id`),
            coordinates: target.getBoundingClientRect()
        };
    },

    getTicketFromTargetForCart: target => {
        return {
            id: target.getAttribute(`data-id`),
            price: target.getAttribute(`data-price`),
            sectionName: target
                .closest(`[data-section]`)
                .getAttribute(`data-name-ua`),
            row: target.closest(`[data-row]`).getAttribute(`data-row`),
            seat: target.querySelector(`text`).textContent
        };
    },

    getNotAvailableTicketFromTargetForCart: (ticketElement, target, orderId) => {
        return {
            id: ticketElement.getAttribute(`data-id`),
            price: ticketElement.getAttribute(`data-price`),
            status: target.getAttribute(`data-status`),
            orderId: orderId,
            sectionName: ticketElement
                .closest(`[data-section]`)
                .getAttribute(`data-name-ua`),
            row: ticketElement.closest(`[data-row]`).getAttribute(`data-row`),
            seat: ticketElement.querySelector(`text`).textContent
        };
    },

    canAddTicketToCart: (cart, ticket) => {
      return cart && (cart.length === 0 ||
        (cart[0].orderId === ticket.orderId && cart[0].status === ticket.status)
      );
    },

    styleSeat: (svgObj, ticket, hallPrice) => {
        const id = ticket.id,
            available = ticket.isAvailable,
            infoPrice = ticket.seatPrice.data,
            order = ticket.order,
            price = infoPrice.price,
            price_zone_id = infoPrice.price_zone_id,
            section_number = infoPrice.section_number,
            row_number = infoPrice.row_number,
            status = ticket.more.status,
            seat_number = infoPrice.seat_number;

        const el = svgObj.querySelector(
            `[data-section="${section_number}"] [data-row="${row_number}"] [data-seat="${seat_number}"]`
        );

        if (!el) return false;

        el.setAttribute(`data-id`, id);
        el.setAttribute(`data-price`, price);

        if (!available) {
            el.setAttribute(`data-not-available`, true);

            if (order) {
                el.setAttribute(`data-order-id`, order.id);
                el.addEventListener(`mouseover`, e => {

                    addClassForElements(
                        svgObj,
                        `[data-order-id="${order.id}"]`,
                        `hovered`
                    );
                });
                el.addEventListener(`mouseout`, e => {
                    removeClassForElements(
                        svgObj,
                        `[data-order-id="${order.id}"]`,
                        `hovered`
                    );
                });
            }

            el.setAttribute(`data-status`, status);

            const circle = el.querySelector(`circle`);
            const text= el.querySelector(`text`);
            const seatColor = getSeatColor(status);
            const textColor = getTextColor(status);

            circle.style.fill = seatColor;
            circle.style.stroke = seatColor;
            text.style.fill = textColor;
        } else {
            const circle = el.querySelector(`circle`),
                color = hallPrice[price_zone_id].color;

            circle.style.fill = color;
            circle.style.stroke = color;
        }
    }
};
