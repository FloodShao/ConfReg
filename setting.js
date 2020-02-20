exports.mysql_config = {
    host: 'localhost',
    port: 3306,
    user: 'shaoguoliang',
    password: 'shaoguoliang',
    database: 'test'
};

exports.cookieSecret = 'session_cookie_secret';

exports.mysql_session_options = {
    host: 'localhost',
    port: 3306,
    user: 'shaoguoliang',
    password: 'shaoguoliang',
    database: '2020_imws_amp_attendee',
    schema: {
        tableName: 'sessions_table',
        columnNames: {
            session_id: 'custom_session_id',
            expires: 'custom_expires_column_name',
            data: 'custom_data_column_name'
        }
    }
};



