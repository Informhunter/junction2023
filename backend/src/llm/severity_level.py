from enum import Enum


class SeverityLevel(Enum):
    def __new__(cls, value: str, ordinal: int, description: str, examples: list[str]):
        obj = object.__new__(cls)
        obj._value_ = value
        obj.ordinal = ordinal
        obj.description = description
        obj.examples = examples
        return obj

    NO_PROBLEM = (
        'no_problem',
        1,
        "Trivial issues or wishes with no negative impact on the individual's emotional or physical well-being.",
        [
            'Wanting to try a new ice cream flavor',
            'Feeling a bit bored and wanting to find a new hobby',
            'Wishing for nicer weather',
            'Hoping to go to the zoo or a museum',
        ],
    )
    LOW = (
        'low',
        2,
        'Minor everyday problems that are slightly bothersome '
        'but manageable and do not significantly affect well-being.',
        [
            'Misplacing house keys',
            'Having a small disagreement with a friend',
        ],
    )
    MODERATE = (
        'moderate',
        3,
        'Issues that have a noticeable negative effect on well-being, '
        'may require effort to resolve, and can cause moderate distress.',
        [
            'Struggling with a work-life balance',
            'Dealing with a persistent health issue',
            'Facing a difficult personal relationship',
            'Experiencing financial strain',
        ],
    )
    CRITICAL = (
        'critical',
        4,
        'Serious, urgent problems that pose a significant risk to life or well-being, '
        'require immediate intervention, and can include mental health crises.',
        [
            'Having thoughts of self-harm or suicide',
            'Experiencing a severe illness or injury',
            'Being in a situation of immediate danger or abuse',
            'Suffering from a significant loss or intense grieving',
        ],
    )

    def __lt__(self, other: 'SeverityLevel'):
        if isinstance(other, self.__class__):
            return self.ordinal < other.ordinal
        raise NotImplementedError

    @classmethod
    def to_markdown_table(cls):
        markdown_output = '| Severity | Description | Examples |\n'
        markdown_output += '| --- | --- | --- |\n'
        for level in cls:
            examples_md = '<br>'.join(level.examples)
            markdown_output += f'| {level.value} | {level.description} | {examples_md} |\n'
        return markdown_output.strip()
