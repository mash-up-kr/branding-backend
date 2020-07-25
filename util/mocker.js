// TODO: Delete this code

function createGetApplicantsMock() {
  const mock = {
    'data': {
      'team_list': [
        {
          'id': 0,
          'name': 'iOS',
        },
        {
          'id': 1,
          'name': 'Android',
        },
        {
          'id': 2,
          'name': 'Backend',
        },
        {
          'id': 3,
          'name': 'Design',
        },
      ],
      'applicant_list_length': 2,
      'applicant_list': [
        {
          'id': 1,
          'team': {
            'id': 2,
            'name': 'Web',
          },
          'name': '김주성',
          'email': 'jusungbang@mashup.com',
          'phone': '010-1234-5678',
          'timestamp': 1595686254,
          'status': 'APPLICATION_COMPLETION',
        },
        {
          'id': 2,
          'team': {
            'id': 4,
            'name': 'Design',
          },
          'name': '남궁욱',
          'email': 'kkkoungg@mashup.com',
          'phone': '010-1234-5678',
          'timestamp': 1595686254,
          'status': 'DOCUMENT_PASS',
        },
        {
          'id': 3,
          'team': {
            'id': 4,
            'name': 'Design',
          },
          'name': '조성윤',
          'email': 'sung@mashup.com',
          'phone': '010-1234-5678',
          'timestamp': 1595686254,
          'status': 'DOCUMENT_PASS',
        },
        {
          'id': 4,
          'team': {
            'id': 4,
            'name': 'Design',
          },
          'name': '김형진',
          'email': 'hj@mashup.com',
          'phone': '010-1234-5678',
          'timestamp': 1595686254,
          'status': 'DOCUMENT_PASS',
        },
        {
          'id': 5,
          'team': {
            'id': 1,
            'name': 'Android',
          },
          'name': '현멍즌',
          'email': 'mj@mashup.com',
          'phone': '010-1234-5678',
          'timestamp': 1595686254,
          'status': 'DOCUMENT_PASS',
        },
      ],
      'timestamp': 1595686254,
    },
  };
  return mock;
}

export {
  createGetApplicantsMock,
};
