// Retorna o mes atual
//https://sistemas.dpc.mar.mil.br/sisap/agendamento/server/agendadespachante.php?nidom=100&cpfcnpjrepre=254.575.568-08
//{"lretorno":true,"cmensagem":"","agenda":[{"ddata":"2022\/11\/22","ddatacompleta":"Ter\u00e7a-feira, 22 de Novembro de 2022","turnomanha":[{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"}]},{"ddata":"2022\/11\/24","ddatacompleta":"Quinta-feira, 24 de Novembro de 2022","turnomanha":[{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022\/11\/28","ddatacompleta":"Segunda-feira, 28 de Novembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022\/11\/29","ddatacompleta":"Ter\u00e7a-feira, 29 de Novembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]}]}

import { ApiResponseProps } from '@/types/api'
import { SchedulingInteresteds } from '@/types/scheduling'
import { getFowardingAgent } from './getForwardingAgent'
import { getServices } from './getServices'

// Não funciona para pegar o mes atual somente os seguintes
//https://sistemas.dpc.mar.mil.br/sisap/agendamento/server/agendadespachante.php?nidom=100&mes=11&ano=2022&cpfcnpjrepre=254.575.568-08
//{"lretorno":true,"cmensagem":"","agenda":[{"ddata":"2022\/12\/1","ddatacompleta":"Quinta-feira, 01 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022\/12\/5","ddatacompleta":"Segunda-feira, 05 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022\/12\/6","ddatacompleta":"Ter\u00e7a-feira, 06 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022\/12\/8","ddatacompleta":"Quinta-feira, 08 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022\/12\/12","ddatacompleta":"Segunda-feira, 12 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022\/12\/13","ddatacompleta":"Ter\u00e7a-feira, 13 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022\/12\/15","ddatacompleta":"Quinta-feira, 15 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022\/12\/20","ddatacompleta":"Ter\u00e7a-feira, 20 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022\/12\/22","ddatacompleta":"Quinta-feira, 22 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022\/12\/27","ddatacompleta":"Ter\u00e7a-feira, 27 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022\/12\/29","ddatacompleta":"Quinta-feira, 29 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]}]}

const AVAILABLE_HOUR_TODAY =
  '{"lretorno":true,"cmensagem":"","agenda":[{"ddata":"2022/11/22","ddatacompleta":"Ter\u00e7a-feira, 22 de Novembro de 2022","turnomanha":[{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"}]},{"ddata":"2022/11/24","ddatacompleta":"Quinta-feira, 24 de Novembro de 2022","turnomanha":[{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022/11/28","ddatacompleta":"Segunda-feira, 28 de Novembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022/11/29","ddatacompleta":"Ter\u00e7a-feira, 29 de Novembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]}]}'
const AVAILABEL_HOURS_NEXT_MONTH =
  '{"lretorno":true,"cmensagem":"","agenda":[{"ddata":"2022/12/1","ddatacompleta":"Quinta-feira, 01 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022/12/5","ddatacompleta":"Segunda-feira, 05 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022/12/6","ddatacompleta":"Ter\u00e7a-feira, 06 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022/12/8","ddatacompleta":"Quinta-feira, 08 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022/12/12","ddatacompleta":"Segunda-feira, 12 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022/12/13","ddatacompleta":"Ter\u00e7a-feira, 13 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022/12/15","ddatacompleta":"Quinta-feira, 15 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022/12/20","ddatacompleta":"Ter\u00e7a-feira, 20 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022/12/22","ddatacompleta":"Quinta-feira, 22 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022/12/27","ddatacompleta":"Ter\u00e7a-feira, 27 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]},{"ddata":"2022/12/29","ddatacompleta":"Quinta-feira, 29 de Dezembro de 2022","turnomanha":[{"choriarioinicial":"08:30","cidshorarios":"b25kZ2Nqamh2UkVwNnltV1pIYmRXN24wdStZYWJSbkJPMGpaNlhmdkNBZz0"},{"choriarioinicial":"09:00","cidshorarios":"Z0Y0MlJOdngzZTZDeWlnd21XbWdJQUw4aUZCVnpXTlhLM0NnNkJkUEVMdz0"},{"choriarioinicial":"09:30","cidshorarios":"VFNYcVV3bVA5emQ5QVdYUGNZY0kzUFVHY0g2Ym9DNS9pbTV6eXJHY1g1VT0"},{"choriarioinicial":"10:00","cidshorarios":"NzQvK3hka3Y2NFpkZGtGMXU3MWVnbTFnMklSbFlqb2NDTEhtWk9XbGNBTT0"},{"choriarioinicial":"10:30","cidshorarios":"aGNGVWRzbzl2ckxESVU3QlZqMEh4M1o5elVlcG5kVWVtKzJ4RmYyR0ZHRT0"},{"choriarioinicial":"11:00","cidshorarios":"NkQxS25KaS9YZDZsaVR6eEpQblVqMkNmdlNPU3FVMkNzMlQvNW9wVXBZdz0"}]}]}'

type ScheduleMarineResponseProps = {
  ddata: string
  ddatacompleta: string
  turnomanha: {
    choriarioinicial: string
    cidshorarios: string
  }[]
  turnotarde: {
    choriarioinicial: string
    cidshorarios: string
  }[]
}

type MarineResponseProps = {
  agenda: ScheduleMarineResponseProps[]
  cmensagem: string
  lretorno: boolean
}

export type GetAvailableSchedulesResponseProps = {
  date: string
  hours: {
    morning: {
      hour: string
      id: string
    }[]
    afternoon: {
      hour: string
      id: string
    }[]
  }
}

type GetAvailableSchedulesProps = {
  date?: string
  nidom: string
  identifier: string
  interesteds: SchedulingInteresteds[]
}

export async function getAvailableSchedules({
  date,
  identifier,
  nidom,
  interesteds,
}: GetAvailableSchedulesProps): Promise<
  ApiResponseProps<GetAvailableSchedulesResponseProps[]>
> {
  const [month, year] = String(date).split('/')

  let response: MarineResponseProps

  if (parseInt(month) === new Date().getMonth() || !date) {
    const URL = `agendadespachante.php?nidom=${nidom}&cpfcnpjrepre=${identifier}`

    const URL_PREFETCH = `etapas.php?nidom=${nidom}&nacaoselecionada=1`
    await window.electron.invoke('scrapper', URL_PREFETCH)

    const interestedsFowardingAgents = interesteds.map(interested => {
      return getFowardingAgent({
        nidom,
        prefetch: false,
        validarAtivo: false,
        identifier: interested.identifier,
      })
    })
    const interestedsServices = interesteds.map(interested => {
      return getServices({
        nidom,
        identifier: interested.identifier,
        gru: interested.gru,
      })
    })

    await Promise.all([...interestedsFowardingAgents, ...interestedsServices])

    const responseText = await window.electron.invoke('scrapper', URL)
    console.log('[responseText]', responseText)
    response = JSON.parse(responseText) as MarineResponseProps
  } else {
    const URL = `agendadespachante.php?nidom=${nidom}&mes=${month}&ano=${year}&cpfcnpjrepre=${identifier}`

    const URL_PREFETCH = `etapas.php?nidom=${nidom}&nacaoselecionada=1`
    await window.electron.invoke('scrapper', URL_PREFETCH)

    const interestedsFowardingAgents = interesteds.map(interested => {
      return getFowardingAgent({
        nidom,
        prefetch: false,
        validarAtivo: false,
        identifier: interested.identifier,
      })
    })
    const interestedsServices = interesteds.map(interested => {
      return getServices({
        nidom,
        identifier: interested.identifier,
        gru: interested.gru,
      })
    })

    await Promise.all([...interestedsFowardingAgents, ...interestedsServices])

    const responseText = await window.electron.invoke('scrapper', URL)
    console.log('[responseText - explicit month]', responseText)
    response = JSON.parse(responseText) as MarineResponseProps
  }

  if (!response.lretorno) throw new Error('Nenhuma agenda disponível')

  const formattedSchedule = response.agenda.map(schedule => ({
    date: schedule.ddata,
    hours: {
      morning:
        schedule?.turnomanha?.map(hour => ({
          hour: hour.choriarioinicial,
          id: hour.cidshorarios,
        })) || [],
      afternoon:
        schedule?.turnotarde?.map(hour => ({
          hour: hour.choriarioinicial,
          id: hour.cidshorarios,
        })) || [],
    },
  }))

  return { data: formattedSchedule, isCached: false, status: 'success' }
}
