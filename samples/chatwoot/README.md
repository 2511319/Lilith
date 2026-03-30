# Chatwoot Samples Status

Файлы в этом каталоге являются illustrative bootstrap samples.
Они не считаются каноническим контрактом Chatwoot API и не должны становиться source of truth для Фазы 1.

Канонический runtime-контракт, уже зафиксированный в репозитории:
- `contracts/inbound-message-normalized.schema.json`

Документ про реальный raw upstream shape для Фазы 1:
- `docs/15-chatwoot-real-contract.md`

Правило использования:
- raw Chatwoot payload в Фазе 1 сначала нормализуется в канонический inbound contract;
- если реальный webhook payload расходится с текущими illustrative samples, приоритет у source mapping и нормализованного контракта, а не у этих файлов.
