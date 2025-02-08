interface EventCategory{
    title: string;
    image: string;
}

interface EventTag{
    title: string;
}

interface Event {
    event_id: number;
    title: string;
    reg_start_date: string;
    reg_end_date: string;
    session_start_date_time: string;
    session_end_date_time: string;
    place: string;
    short_description: string;
    full_description: string;
    pre_requisities: string;
    terms_and_conditions: string;
    event_type: string;
    poster: string;
    price: string;
    discount_price: string;
    categories: EventCategory[];
    tags: EventTag[];
}

