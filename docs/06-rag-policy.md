# 06. Retrieval and Grounding Policy

## Статус

Supporting-doc для `v2 retrieval tool path`.
Этот документ больше не трактует RAG как отдельный линейный pipeline-step после state.
В `v2` retrieval — bounded capability, которой пользуется agent core под внешним контролем.

## Цель

Retrieval нужен не для декоративной "умности", а для grounded-ответов о продуктах, услугах, процессах и фактах компании.

## Источник знания

- первичный knowledge source — approved snapshot-источники компании;
- каждый knowledge run должен быть привязан к `snapshot_id` / `knowledge_version`;
- retrieval без понятной knowledge-versioning дисциплины не считается надёжным.

## Retrieval model in v2

### Что изменилось

- в `v1` retrieval был отдельным deterministic этапом;
- в `v2` retrieval становится bounded tool capability для agent core;
- но grounded truth всё равно остаётся explicit и наблюдаемой.

### Что это значит practically

- retrieval может вызываться агентом по необходимости;
- tool invocation должен быть traceable;
- quality результата должен быть нормализован;
- слабый retrieval не даёт права отвечать как будто знание подтверждено.

## Retrieval Rules

1. Retrieval допустим только из approved knowledge sources.
2. Tool invocation должен быть отражён в trace.
3. Agent не должен получать uncontrolled dump вместо bounded context.
4. Retrieval result должен иметь quality signal как минимум:
   - `strong`
   - `weak`
   - `empty`
5. При `weak` или `empty` нельзя симулировать grounded knowledge.

## Safe behavior

### strong

- ответ может опираться на retrieved context;
- trace должен показывать, что grounded path реально использован.

### weak

- ответ ограничивает уверенность;
- допускается soft limitation;
- при критичности кейса возможен handoff recommendation.

### empty

- нельзя говорить как будто система "знает";
- нужен safe limitation, уточнение или handoff path.

## Запреты

- нельзя отвечать как будто знание подтверждено, если retrieval пустой;
- нельзя смешивать неподтверждённую фантазию с grounded context;
- нельзя использовать "текущий сайт" как неявную истину без versioned snapshot;
- нельзя скрывать факт использования retrieval tool в observability.

## Acceptance-oriented признаки правильного retrieval

- retrieval tool path воспроизводим;
- quality signal виден;
- grounded answer path доказан evidence;
- weak/empty retrieval не приводит к галлюцинациям;
- trace показывает, что именно было использовано и в каком качестве.
